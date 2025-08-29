import { Bus, Booking, User } from '../models/index.js';
import crypto from 'crypto';
import QRCode from 'qrcode';
import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate unique booking ID
const generateBookingId = () => {
  return 'TN' + Date.now().toString(36).toUpperCase() + crypto.randomBytes(2).toString('hex').toUpperCase();
};

// Book a ticket (User only)
export const bookTicket = async (req, res) => {
  try {
    const { busId, passengers, journeyDate, contactInfo } = req.body;
    const userId = req.user.id;

    // Validate bus
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    // Check if seats are available
    const requestedSeats = passengers.map(p => p.seatNumber);
    const existingBookings = await Booking.find({
      busId: busId,
      journeyDate: new Date(journeyDate),
      bookingStatus: { $in: ["confirmed"] },
      paymentStatus: "completed"
    });

    const bookedSeats = existingBookings.flatMap(booking => 
      booking.passengers.map(passenger => passenger.seatNumber)
    );

    const conflictingSeats = requestedSeats.filter(seat => bookedSeats.includes(seat));
    if (conflictingSeats.length > 0) {
      return res.status(400).json({ 
        error: `Seats ${conflictingSeats.join(', ')} are already booked` 
      });
    }

    // Calculate total amount
    let totalAmount = 0;
    passengers.forEach(passenger => {
      const seat = bus.seats.find(s => s.number === passenger.seatNumber);
      if (seat) {
        totalAmount += bus.price[seat.type];
      }
    });

    // Create booking
    const bookingId = generateBookingId();
    const booking = await Booking.create({
      bookingId,
      userId,
      busId,
      passengers,
      totalAmount,
      journeyDate: new Date(journeyDate),
      contactInfo,
      route: bus.route,
      busDetails: {
        busNumber: bus.busNumber,
        departureTime: bus.departureTime,
        arrivalTime: bus.arrivalTime,
        busType: bus.busType
      }
    });

    // Generate QR code
    const qrData = JSON.stringify({
      bookingId: booking.bookingId,
      busNumber: bus.busNumber,
      date: journeyDate,
      seats: requestedSeats
    });
    const qrCodeDataURL = await QRCode.toDataURL(qrData);

    // Update booking with QR code
    booking.qrCode = qrCodeDataURL;
    await booking.save();

    res.status(201).json({ 
      success: true,
      message: "Booking created successfully", 
      booking: {
        bookingId: booking.bookingId,
        totalAmount: booking.totalAmount,
        paymentStatus: booking.paymentStatus,
        passengers: booking.passengers,
        qrCode: qrCodeDataURL
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get my bookings
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const bookings = await Booking.find({ userId })
      .populate('busId', 'busNumber route departureTime arrivalTime busType')
      .sort({ createdAt: -1 });

    res.json({ 
      success: true,
      count: bookings.length,
      bookings 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all bookings (Admin only)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email phone')
      .populate('busId', 'busNumber route departureTime arrivalTime busType')
      .sort({ createdAt: -1 });

    res.json({ 
      success: true,
      count: bookings.length,
      bookings 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    const booking = await Booking.findOne({ bookingId })
      .populate('userId', 'name email phone')
      .populate('busId', 'busNumber route departureTime arrivalTime busType operator');

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Check if user owns this booking or is admin
    if (booking.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json({ 
      success: true,
      booking 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { paymentStatus, paymentId, razorpayOrderId } = req.body;

    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    booking.paymentStatus = paymentStatus;
    if (paymentId) booking.paymentId = paymentId;
    if (razorpayOrderId) booking.razorpayOrderId = razorpayOrderId;

    await booking.save();

    res.json({ 
      success: true,
      message: "Payment status updated", 
      booking 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Check if user owns this booking or is admin
    if (booking.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: "Access denied" });
    }

    booking.bookingStatus = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();

    res.json({ 
      success: true,
      message: "Booking cancelled successfully" 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete booking (Admin only)
export const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    await Booking.findByIdAndDelete(bookingId);
    
    res.json({ 
      success: true,
      message: "Booking deleted successfully" 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
