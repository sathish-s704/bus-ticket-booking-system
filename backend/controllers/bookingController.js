const Booking = require('../models/bookingModel');
const Bus = require('../models/busModel');

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const { busId, seatsBooked } = req.body;

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });

    if (bus.seatsAvailable < seatsBooked) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const booking = new Booking({
      user: req.user._id,
      bus: busId,
      seatsBooked,
    });

    await booking.save();

    // Update seat availability
    bus.seatsAvailable -= seatsBooked;
    await bus.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

// Get user bookings
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('bus', 'busName route');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    const bus = await Bus.findById(booking.bus);
    bus.seatsAvailable += booking.seatsBooked;
    await bus.save();

    await booking.remove();

    res.status(200).json({ message: 'Booking canceled' });
  } catch (error) {
    res.status(500).json({ message: 'Error canceling booking', error });
  }
};

module.exports = { createBooking, getUserBookings, cancelBooking };
