const Job = require('../models/Job');
const User = require('../models/User');

const jobController = {
  // Create a new job posting
  createJob: async (req, res) => {
    try {
      const {
        title,
        description,
        requirements,
        location,
        salaryRange,
        jobType,
        requiredTimings
      } = req.body;

      // Create new job
      const job = new Job({
        title,
        description,
        requirements,
        location,
        salaryRange,
        jobType,
        requiredTimings,
        employer: req.user.id
      });

      await job.save();

      // Add job to employer's profile
      await User.findByIdAndUpdate(
        req.user.id,
        { $push: { jobPostings: job._id } }
      );

      res.status(201).json(job);
    } catch (error) {
      console.error('Error creating job:', error);
      res.status(500).json({ message: 'Error creating job posting', error: error.message });
    }
  },

  // Get all active jobs
  getJobs: async (req, res) => {
    try {
      const jobs = await Job.find({ status: 'active' })
        .populate('employer', 'email name')
        .sort({ createdAt: -1 });
      res.json(jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({ message: 'Error fetching jobs', error: error.message });
    }
  },

  // Get job by ID
  getJobById: async (req, res) => {
    try {
      const job = await Job.findById(req.params.id)
        .populate('employer', 'email name');
      
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      
      res.json(job);
    } catch (error) {
      console.error('Error fetching job:', error);
      res.status(500).json({ message: 'Error fetching job', error: error.message });
    }
  },

  // Update job status
  updateJobStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const job = await Job.findById(req.params.id);

      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }

      // Check if user is the employer or admin
      if (job.employer.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to update this job' });
      }

      job.status = status;
      await job.save();

      res.json(job);
    } catch (error) {
      console.error('Error updating job:', error);
      res.status(500).json({ message: 'Error updating job', error: error.message });
    }
  },

  // Get jobs by employer
  getEmployerJobs: async (req, res) => {
    try {
      const jobs = await Job.find({ employer: req.user.id })
        .sort({ createdAt: -1 });
      res.json(jobs);
    } catch (error) {
      console.error('Error fetching employer jobs:', error);
      res.status(500).json({ message: 'Error fetching employer jobs', error: error.message });
    }
  },

  // Get all jobs (for admin)
  getAllJobs: async (req, res) => {
    try {
      const jobs = await Job.find({})
        .populate('employer', 'email name')
        .sort({ createdAt: -1 });
      res.json(jobs);
    } catch (error) {
      console.error('Error fetching all jobs:', error);
      res.status(500).json({ message: 'Error fetching all jobs', error: error.message });
    }
  }
};

module.exports = jobController; 