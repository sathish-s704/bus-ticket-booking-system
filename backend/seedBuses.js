import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
dotenv.config();

const seatSchema = new mongoose.Schema({
  number: String,
  isAvailable: Boolean,
  type: String,
}, { _id: false });

const busSchema = new mongoose.Schema({
  busNumber: String,
  route: {
    from: String,
    to: String,
  },
  departureTime: String,
  arrivalTime: String,
  date: Date,
  totalSeats: Number,
  availableSeats: Number,
  price: {
    regular: Number,
    premium: Number,
  },
  busType: String,
  amenities: [String],
  seats: [seatSchema],
  isActive: Boolean,
  operator: {
    name: String,
    contact: String,
  },
  createdAt: Date,
  updatedAt: Date,
});

const Bus = mongoose.model("Bus", busSchema);

const routes = [
  ["Chennai", "Bangalore"],
  ["Erode", "Chennai"],
  ["Madurai", "Hyderabad"],
  ["Coimbatore", "Trichy"],
  ["Salem", "Chennai"],
];

const operators = [
  { name: "Parveen Travels", contact: "+91-9876543212" },
  { name: "KPN Travels", contact: "+91-9876001122" },
  { name: "SETC", contact: "+91-9944332211" },
];

const busTypes = ["Sleeper", "Semi-Sleeper", "Luxury AC Sleeper"];

const amenitiesList = [
  ["WiFi", "Charging Point", "Blanket"],
  ["Charging Point", "Water Bottle"],
  ["WiFi", "Charging Point", "Snacks", "Blanket"],
];

async function seedBuses() {
  await mongoose.connect(process.env.MONGODB_URI);

  console.log("Connected to MongoDB ✅");

  await Bus.deleteMany(); // Clear old data

  const startDate = new Date("2025-08-26");
  const endDate = new Date("2026-08-26");

  const buses = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const busesPerDay = faker.number.int({ min: 2, max: 4 });

    for (let i = 0; i < busesPerDay; i++) {
      const route = faker.helpers.arrayElement(routes);
      const operator = faker.helpers.arrayElement(operators);
      const busType = faker.helpers.arrayElement(busTypes);
      const amenities = faker.helpers.arrayElement(amenitiesList);

      const totalSeats = 42;
      const seats = [];
      for (let j = 1; j <= totalSeats; j++) {
        seats.push({
          number: j.toString(),
          isAvailable: true,
          type: j <= 28 ? "regular" : "premium",
        });
      }

      buses.push({
        busNumber: `TN${faker.number.int({ min: 1, max: 99 })
          .toString()
          .padStart(2, "0")}${faker.helpers.arrayElement([
          "AB",
          "CD",
          "EF",
        ])}${faker.number.int({ min: 1000, max: 9999 })}`,
        route: { from: route[0], to: route[1] },
        departureTime: `${faker.number.int({ min: 18, max: 23 })
          .toString()
          .padStart(2, "0")}:${faker.helpers.arrayElement(["00", "30"])}`,
        arrivalTime: `${faker.number.int({ min: 4, max: 10 })
          .toString()
          .padStart(2, "0")}:${faker.helpers.arrayElement(["00", "30"])}`,
        date: new Date(currentDate),
        totalSeats,
        availableSeats: totalSeats,
        price: {
          regular: faker.number.int({ min: 300, max: 900 }),
          premium: faker.number.int({ min: 900, max: 1600 }),
        },
        busType,
        amenities,
        seats,
        isActive: true,
        operator,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  await Bus.insertMany(buses);
  console.log(`✅ Inserted ${buses.length} bus records into MongoDB`);
  mongoose.connection.close();
}

seedBuses();
