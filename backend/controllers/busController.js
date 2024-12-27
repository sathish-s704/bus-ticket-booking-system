const Bus = require('../models/busModel'); // Ensure this model exists

// Add a new bus
const addBus = async (req, res) => {
  try {
    const { name, route, capacity } = req.body;
    const bus = await Bus.create({ name, route, capacity });
    res.status(201).json(bus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all buses
const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find({});
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update bus details
const updateBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.status(200).json(bus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a bus
const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.status(200).json({ message: 'Bus deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addBus, getAllBuses, updateBus, deleteBus };
