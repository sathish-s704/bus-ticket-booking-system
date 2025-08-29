import { Bus, Booking } from '../models/index.js';

// Add a new bus (Admin only)
export const addBus = async (req, res) => {
  try {
    const { 
      busNumber, 
      route, 
      departureTime, 
      arrivalTime, 
      date, 
      totalSeats, 
      price, 
      busType, 
      amenities, 
      operator 
    } = req.body;

    // Initialize seats array
    const seats = Array.from({ length: totalSeats }, (_, index) => ({
      number: `${index + 1}`,
      isAvailable: true,
      type: index < Math.floor(totalSeats * 0.7) ? 'regular' : 'premium'
    }));

    const bus = await Bus.create({
      busNumber,
      route,
      departureTime,
      arrivalTime,
      date,
      totalSeats,
      availableSeats: totalSeats,
      price,
      busType,
      amenities: amenities || [],
      operator,
      seats
    });

    res.status(201).json({ 
      success: true,
      message: "Bus added successfully", 
      bus 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all buses (Users + Admins)
export const getBuses = async (req, res) => {
  try {
    const { from, to, date } = req.query;
    
    let query = {};
    if (from && to) {
      query['route.from'] = new RegExp(from, 'i');
      query['route.to'] = new RegExp(to, 'i');
    }
    if (date) {
      const searchDate = new Date(date);
      query.date = {
        $gte: new Date(searchDate.setHours(0, 0, 0, 0)),
        $lt: new Date(searchDate.setHours(23, 59, 59, 999))
      };
    }
    
  // query.isActive = true;

    const buses = await Bus.find(query).sort({ departureTime: 1 });
    
    res.json({ 
      success: true,
      count: buses.length,
      buses 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Import buses from a predefined list (Admin only)
export const importBuses = async (req, res) => {
  try {
    const buses = [
      {
        busNumber: "TN01AB1234",
        route: { from: "Chennai", to: "Erode" },
        departureTime: "21:00",
        arrivalTime: "06:00",
        date: new Date("2025-08-25"),
        totalSeats: 40,
        availableSeats: 40,
        price: { regular: 750, premium: 950 },
        busType: "AC",
        amenities: ["WiFi", "Charging Point", "Water Bottle"],
        operator: { name: "KPN Travels", contact: "+91-9876543210" }
      },
      {
        busNumber: "TN02CD5678",
        route: { from: "Chennai", to: "Erode" },
        departureTime: "22:30",
        arrivalTime: "07:30",
        date: new Date("2025-08-25"),
        totalSeats: 35,
        availableSeats: 35,
        price: { regular: 800, premium: 1000 },
        busType: "Non-AC",
        amenities: ["Water Bottle"],
        operator: { name: "SRM Travels", contact: "+91-9876543211" }
      },
      {
        busNumber: "TN03EF9012",
        route: { from: "Erode", to: "Chennai" },
        departureTime: "20:00",
        arrivalTime: "05:00",
        date: new Date("2025-08-26"),
        totalSeats: 42,
        availableSeats: 42,
        price: { regular: 780, premium: 980 },
        busType: "Sleeper",
        amenities: ["WiFi", "Charging Point", "Blanket"],
        operator: { name: "Parveen Travels", contact: "+91-9876543212" }
      },
      {
        busNumber: "TN04GH3456",
        route: { from: "Chennai", to: "Madurai" },
        departureTime: "19:45",
        arrivalTime: "05:45",
        date: new Date("2025-08-25"),
        totalSeats: 38,
        availableSeats: 38,
        price: { regular: 950, premium: 1150 },
        busType: "AC",
        amenities: ["WiFi", "Charging Point", "Water Bottle", "Snacks"],
        operator: { name: "YBM Travels", contact: "+91-9876543213" }
      }
    ];

    // Initialize seats for each bus
    const busesToInsert = buses.map(bus => ({
      ...bus,
      seats: Array.from({ length: bus.totalSeats }, (_, index) => ({
        number: `${index + 1}`,
        isAvailable: true,
        type: index < Math.floor(bus.totalSeats * 0.7) ? 'regular' : 'premium'
      }))
    }));

    await Bus.insertMany(busesToInsert);
    
    res.status(201).json({ 
      success: true,
      message: `${buses.length} buses imported successfully` 
    });
  } catch (err) {
    res.status(500).json({ error: `Error importing buses: ${err.message}` });
  }
};

// Get a single bus by ID and date
export const getBusById = async (req, res) => {
  try {
    const { busId } = req.params;
    const { date } = req.query;

    // Get bus details
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    // Get booked seats for the given date
    const searchDate = new Date(date);
    const bookings = await Booking.find({
      busId: busId,
      journeyDate: {
        $gte: new Date(searchDate.setHours(0, 0, 0, 0)),
        $lt: new Date(searchDate.setHours(23, 59, 59, 999))
      },
      bookingStatus: { $in: ["confirmed"] },
      paymentStatus: "completed"
    });

    const bookedSeats = bookings.flatMap(booking => 
      booking.passengers.map(passenger => passenger.seatNumber)
    );

    res.json({ 
      success: true,
      bus, 
      bookedSeats 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update bus (Admin only)
export const updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const bus = await Bus.findById(id);
    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    // Update bus
    const updatedBus = await Bus.findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    });

    res.json({ 
      success: true,
      message: "Bus updated successfully", 
      bus: updatedBus 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete bus (Admin only)
export const deleteBus = async (req, res) => {
  try {
    const { id } = req.params;

    const bus = await Bus.findById(id);
    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    // Check if there are any active bookings for this bus
    const activeBookings = await Booking.find({
      busId: id,
      bookingStatus: { $in: ["confirmed", "pending"] }
    });

    if (activeBookings.length > 0) {
      return res.status(400).json({ 
        error: "Cannot delete bus with active bookings" 
      });
    }

    await Bus.findByIdAndDelete(id);
    
    res.json({ 
      success: true,
      message: "Bus deleted successfully" 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
