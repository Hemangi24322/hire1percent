const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const jobController = require('../controllers/job.controller');

// Public routes
router.get('/', jobController.getJobs);

// Protected routes
router.get('/employer', auth, jobController.getEmployerJobs);
router.post('/', auth, jobController.createJob);
router.get('/:id', jobController.getJobById);
router.put('/:id/status', auth, jobController.updateJobStatus);
router.get('/all', auth, jobController.getAllJobs);

module.exports = router; 