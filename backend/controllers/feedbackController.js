const Feedback = require('../models/feedbackModel');

// Add feedback
const addFeedback = async (req, res) => {
  try {
    const { message } = req.body;
    const feedback = new Feedback({ user: req.user._id, message });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error adding feedback', error });
  }
};

// Get all feedback
const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().populate('user', 'name email');
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error });
  }
};

module.exports = { addFeedback, getFeedback };
