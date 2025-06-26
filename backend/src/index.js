require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Import routes
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const jobRoutes = require('./routes/job.routes');
const contactRoutes = require('./routes/contact.routes');

// Import middleware
const { errorHandler } = require('./middleware/error.middleware');

// Import database connection
const connectDB = require('./config/database');

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Logging middleware
app.use((req, res, next) => {
  console.log('=== Request Details ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Body:', req.body);
  console.log('Headers:', req.headers);
  console.log('=====================');
  next();
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/contact', contactRoutes);

// Debug logging
console.log('Registered routes:');
app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
        console.log(r.route.stack[0].method.toUpperCase() + ' ' + r.route.path);
    }
});

// Error handling middleware
app.use(errorHandler);

// MongoDB connection
console.log('=== Database Connection Process Started ===');
console.log('Attempting to connect to MongoDB...');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hire1percent';
console.log('Connection URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB Connected Successfully:', mongoose.connection.host);
  console.log('Database Name:', mongoose.connection.name);
  console.log('Connection State:', mongoose.connection.readyState);
  console.log('=== Database Connection Process Completed ===');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
}); 