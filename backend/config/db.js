const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.log("MONGO_URI is undefined. Check .env file.");
    return;
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Attempting to connect to MongoDB...");
await mongoose.connect(process.env.MONGO_URI);
console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if DB connection fails
  }
};

module.exports = connectDB;
