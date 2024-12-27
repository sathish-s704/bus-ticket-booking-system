const mongoose = require('mongoose');

const busSchema = mongoose.Schema(
  {
    busName: { type: String, required: true },
    route: { type: String, required: true },
    seatsAvailable: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bus', busSchema);
