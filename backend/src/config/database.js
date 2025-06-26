const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('\n=== Database Connection Process Started ===');
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection URI:', process.env.MONGODB_URI);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
    console.log('Database Name:', conn.connection.name);
    console.log('Connection State:', conn.connection.readyState);
    console.log('=== Database Connection Process Completed ===\n');
  } catch (error) {
    console.error('\n=== Database Connection Error ===');
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    console.error('=== Database Connection Error ===\n');
    process.exit(1);
  }
};

module.exports = connectDB; 