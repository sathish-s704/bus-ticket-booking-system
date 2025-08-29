// backend/bus-import.js
import connectDB from "./config/database.js";
import { Bus } from './models/index.js';
import dotenv from 'dotenv';

dotenv.config();

// Sample bus data to import
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

const importBuses = async () => {
  try {
    console.log("Starting bus import...");
    
    // Connect to MongoDB
    await connectDB();

    // Initialize seats for each bus
    const busesToInsert = buses.map(bus => ({
      ...bus,
      seats: Array.from({ length: bus.totalSeats }, (_, index) => ({
        number: `${index + 1}`,
        isAvailable: true,
        type: index < Math.floor(bus.totalSeats * 0.7) ? 'regular' : 'premium'
      }))
    }));

    // Clear existing buses (optional)
    await Bus.deleteMany({});
    
    // Insert new buses
    const result = await Bus.insertMany(busesToInsert);
    console.log(`Successfully imported ${result.length} buses.`);
    
    // Close the connection
    process.exit(0);
  } catch (error) {
    console.error("Error importing buses:", error);
    process.exit(1);
  }
};

importBuses();
