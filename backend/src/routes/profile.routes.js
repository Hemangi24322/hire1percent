const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profile.controller');
const auth = require('../middleware/auth');

// Logging middleware
const requestLogger = (req, res, next) => {
  console.log('\n=== Profile Request Details ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Body:', req.body);
  console.log('Headers:', req.headers);
  console.log('=============================\n');
  next();
};

// Apply logging middleware to all routes
router.use(requestLogger);

// Get profile for the logged-in user
router.get('/', auth, getProfile);

// Update profile for the logged-in user
router.post('/', auth, updateProfile);
router.put('/', auth, updateProfile);

// Get profile by user ID (for admin or own profile)
router.get('/:userId', auth, getProfile);

module.exports = router; 