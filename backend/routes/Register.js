// Register Route (backend)
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    
    // Save the user
    await newUser.save();
    
    // Send response
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = register;
