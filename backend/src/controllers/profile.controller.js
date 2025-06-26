const Profile = require('../models/Profile');
const User = require('../models/User');

// Get profile for the logged-in user or by user ID
const getProfile = async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    
    // First check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user is authorized to view this profile
    if (userId.toString() !== req.user.id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this profile' });
    }

    let profile = await Profile.findOne({ user: userId });

    if (!profile) {
      // Create a new profile if it doesn't exist
      profile = new Profile({
        user: userId,
        role: user.role,
        // Initialize role-specific fields
        ...(user.role === 'candidate' && {
          personalInfo: {},
          skills: [],
          experience: [],
          education: []
        }),
        ...(user.role === 'employer' && {
          companyInfo: {},
          contactInfo: {},
          jobPostings: []
        }),
        ...(user.role === 'admin' && {
          adminInfo: {}
        })
      });
      await profile.save();
    }

    res.json(profile);
  } catch (error) {
    console.error('Error in getProfile:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

// Update profile for the logged-in user
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = req.body;

    // First check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let profile = await Profile.findOne({ user: userId });

    if (!profile) {
      // Create a new profile if it doesn't exist
      profile = new Profile({
        user: userId,
        role: user.role,
        ...updateData
      });
    } else {
      // Update existing profile
      Object.assign(profile, updateData);
    }

    await profile.save();

    // Update user's profile completion status
    await User.findByIdAndUpdate(userId, {
      profileCompleted: true
    });

    res.json(profile);
  } catch (error) {
    console.error('Error in updateProfile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};

module.exports = {
  getProfile,
  updateProfile
}; 