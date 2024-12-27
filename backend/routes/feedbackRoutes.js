const express = require('express');
const { 
  addFeedback, 
  getFeedback 
} = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addFeedback);
router.get('/', protect, getFeedback);

module.exports = router;
