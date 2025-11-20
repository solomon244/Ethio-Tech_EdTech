const mongoose = require('mongoose');
const env = require('./env');

const connectDatabase = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(env.mongoUri, {
      autoIndex: true,
    });
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;

