const express = require('express');
const { 
  createBooking, 
  getUserBookings, 
  cancelBooking 
} = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/', protect, getUserBookings);
router.delete('/:id', protect, cancelBooking);

module.exports = router;
