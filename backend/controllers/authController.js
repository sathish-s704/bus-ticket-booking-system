const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });
    res.status(201).json({ _id: user.id, name: user.name, email: user.email, token: generateToken(user.id) });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

module.exports = { registerUser };
