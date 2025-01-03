const jwt = require('jsonwebtoken');

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract the token after "Bearer "

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token and decode the user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user information to the request object
    next();  // Proceed to the next middleware/route handler
  } catch (err) {
    console.error('Authentication error:', err.message); // Log the error for debugging purposes
    res.status(401).json({ msg: 'Token is not valid' }); // Generic error message
  }
};

module.exports = { authenticateUser };
