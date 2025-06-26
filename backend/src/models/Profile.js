const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  role: {
    type: String,
    enum: ['candidate', 'employer', 'admin'],
    required: true
  },
  // Candidate-specific fields
  personalInfo: {
    fullName: String,
    phone: String,
    location: String,
    bio: String
  },
  skills: [String],
  experience: [{
    title: String,
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  education: [{
    school: String,
    degree: String,
    field: String,
    startDate: String,
    endDate: String,
    description: String
  }],
  // Employer-specific fields
  companyInfo: {
    name: String,
    website: String,
    industry: String,
    size: String,
    location: String,
    description: String
  },
  contactInfo: {
    name: String,
    position: String,
    email: String,
    phone: String
  },
  jobPostings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosting'
  }],
  // Admin-specific fields
  adminInfo: {
    fullName: String,
    email: String,
    phone: String,
    role: String
  },
  // Common fields
  systemSettings: {
    allowNewRegistrations: {
      type: Boolean,
      default: true
    },
    requireEmailVerification: {
      type: Boolean,
      default: true
    },
    maxLoginAttempts: {
      type: Number,
      default: 5
    },
    sessionTimeout: {
      type: Number,
      default: 24
    }
  }
}, {
  timestamps: true
});

// Add a pre-save middleware to ensure role-specific fields are present
profileSchema.pre('save', function(next) {
  if (this.role === 'candidate') {
    if (!this.personalInfo) this.personalInfo = {};
    if (!this.skills) this.skills = [];
    if (!this.experience) this.experience = [];
    if (!this.education) this.education = [];
  } else if (this.role === 'employer') {
    if (!this.companyInfo) this.companyInfo = {};
    if (!this.contactInfo) this.contactInfo = {};
    if (!this.jobPostings) this.jobPostings = [];
  } else if (this.role === 'admin') {
    if (!this.adminInfo) this.adminInfo = {};
  }
  next();
});

module.exports = mongoose.model('Profile', profileSchema); 