// backend/models/Bus.js
import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    enum: ['regular', 'premium'],
    default: 'regular'
  }
});

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  route: {
    from: {
      type: String,
      required: true,
      trim: true
    },
    to: {
      type: String,
      required: true,
      trim: true
    }
  },
  departureTime: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  totalSeats: {
    type: Number,
    required: true,
    default: 40
  },
  availableSeats: {
    type: Number,
    required: true
  },
  price: {
    regular: {
      type: Number,
      required: true
    },
    premium: {
      type: Number,
      required: true
    }
  },
  busType: {
    type: String,
    enum: ['AC', 'Non-AC', 'Sleeper', 'Semi-Sleeper'],
    required: true
  },
  amenities: [{
    type: String
  }],
  seats: [seatSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  operator: {
    name: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
busSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Bus', busSchema);
