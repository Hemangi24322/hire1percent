const jwt = require('jsonwebtoken');
const { ApiError } = require('./error.middleware');
const User = require('../models/user.model');

// Middleware to protect routes
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(401, 'Not authorized to access this route');
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      const user = await User.findById(decoded.id);
      if (!user) {
        throw new ApiError(401, 'User not found');
      }

      // Check if user is active
      if (user.status !== 'active') {
        throw new ApiError(401, 'User account is not active');
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (error) {
      throw new ApiError(401, 'Not authorized to access this route');
    }
  } catch (error) {
    next(error);
  }
};

// Middleware to check user role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, `User role ${req.user.role} is not authorized to access this route`));
    }
    next();
  };
};

module.exports = {
  protect,
  authorize
}; 