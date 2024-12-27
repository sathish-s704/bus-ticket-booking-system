const express = require('express');
const { addBus, getAllBuses, updateBus, deleteBus } = require('../controllers/busController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Route for adding a bus
router.post('/add', protect, admin, addBus);

// Route for fetching all buses
router.get('/', protect, getAllBuses);

// Route for updating bus details
router.put('/:id', protect, admin, updateBus);

// Route for deleting a bus
router.delete('/:id', protect, admin, deleteBus);

// Export the router to be used in other files
module.exports = router;
