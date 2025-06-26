const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
};

// Register a new user
exports.register = async (req, res) => {
  console.log('\n=== Registration Process Started ===');
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role, name } = req.body;
    console.log('Registration attempt for email:', email);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format:', email);
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      console.log('Password validation failed');
      return res.status(400).json({
        message: 'Password must be at least 8 characters long and contain uppercase, lowercase, number and special character'
      });
    }

    // Check if user already exists
    console.log('Checking if user exists...');
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Validate role
    const validRoles = ['candidate', 'employer', 'admin'];
    if (role && !validRoles.includes(role)) {
      console.log('Invalid role specified:', role);
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    // Create new user
    console.log('Creating new user...');
    user = new User({
      email,
      password,
      role: role || 'candidate',
      name: name || '',
      profileCompleted: false,
      createdAt: new Date(),
      lastLogin: null
    });

    // Hash password
    console.log('Hashing password...');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    console.log('Saving user to database...');
    await user.save();
    console.log('User saved successfully:', user.id);

    // Generate token
    console.log('Generating JWT token...');
    const token = generateToken(user);

    // Return user data
    console.log('Registration successful, sending response...');
    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        profileCompleted: user.profileCompleted
      }
    });
    console.log('=== Registration Process Completed ===\n');
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login user
exports.login = async (req, res) => {
  console.log('\n=== Login Process Started ===');
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    // Find user
    console.log('Finding user in database...');
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if account is locked
    if (user.loginAttempts >= 5 && user.lockUntil > Date.now()) {
      console.log('Account locked:', email);
      return res.status(401).json({
        message: 'Account is locked. Try again after ' + new Date(user.lockUntil).toLocaleString()
      });
    }

    // Verify password
    console.log('Verifying password...');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid password for user:', email);
      // Increment login attempts
      user.loginAttempts = (user.loginAttempts || 0) + 1;
      
      // Lock account if too many failed attempts
      if (user.loginAttempts >= 5) {
        user.lockUntil = Date.now() + 30 * 60 * 1000; // Lock for 30 minutes
        console.log('Account locked due to too many failed attempts:', email);
      }
      
      await user.save();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Reset login attempts on successful login
    console.log('Login successful, resetting login attempts...');
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    console.log('Generating JWT token...');
    const token = generateToken(user);

    // Return user data
    console.log('Sending successful login response...');
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        profileCompleted: user.profileCompleted
      }
    });
    console.log('=== Login Process Completed ===\n');
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  console.log('\n=== Get Current User Process Started ===');
  try {
    console.log('Finding user by ID:', req.user.id);
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      console.log('User not found:', req.user.id);
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User found, sending response...');
    res.json(user);
    console.log('=== Get Current User Process Completed ===\n');
  } catch (err) {
    console.error('Get current user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  console.log('\n=== Update Profile Process Started ===');
  try {
    const { name, bio, skills, experience, education } = req.body;
    console.log('Update profile request for user:', req.user.id);
    
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    // Build profile object
    const profileFields = {};
    if (name) profileFields.name = name;
    if (bio) profileFields.bio = bio;
    if (skills) profileFields.skills = skills;
    if (experience) profileFields.experience = experience;
    if (education) profileFields.education = education;
    profileFields.profileCompleted = true;
    profileFields.updatedAt = new Date();

    console.log('Updating user profile...');
    // Update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: profileFields },
      { new: true }
    ).select('-password');

    if (!user) {
      console.log('User not found:', req.user.id);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Profile updated successfully');
    res.json(user);
    console.log('=== Update Profile Process Completed ===\n');
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Server error during profile update' });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  console.log('\n=== Change Password Process Started ===');
  try {
    const { currentPassword, newPassword } = req.body;
    console.log('Change password request for user:', req.user.id);

    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    // Find user
    console.log('Finding user...');
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log('User not found:', req.user.id);
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    console.log('Verifying current password...');
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      console.log('Current password is incorrect');
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Validate new password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      console.log('New password validation failed');
      return res.status(400).json({
        message: 'New password must be at least 8 characters long and contain uppercase, lowercase, number and special character'
      });
    }

    // Hash new password
    console.log('Hashing new password...');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.updatedAt = new Date();

    console.log('Saving updated password...');
    await user.save();

    console.log('Password changed successfully');
    res.json({ message: 'Password updated successfully' });
    console.log('=== Change Password Process Completed ===\n');
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ message: 'Server error during password change' });
  }
};

// Logout
exports.logout = async (req, res) => {
  console.log('\n=== Logout Process Started ===');
  try {
    console.log('User logged out:', req.user.id);
    res.json({ message: 'Logged out successfully' });
    console.log('=== Logout Process Completed ===\n');
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ message: 'Server error during logout' });
  }
}; 