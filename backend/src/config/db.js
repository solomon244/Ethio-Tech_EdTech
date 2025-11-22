const mongoose = require('mongoose');
const env = require('./env');

const connectDatabase = async () => {
  // Validate MONGO_URI
  if (!env.mongoUri || env.mongoUri.trim() === '') {
    console.error('❌ MONGO_URI is not set in environment variables');
    console.error('Please create a .env file with MONGO_URI=mongodb://localhost:27017/ethio-tech-hub');
    process.exit(1);
  }

  try {
    mongoose.set('strictQuery', true);
    
    // Determine if using Atlas (mongodb+srv://) or local MongoDB
    const isAtlas = env.mongoUri.startsWith('mongodb+srv://');
    
    // Connection options
    const options = {
      autoIndex: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    // For local MongoDB, we don't need SSL
    // For Atlas, SSL is handled automatically
    if (!isAtlas) {
      // Local MongoDB connection
      await mongoose.connect(env.mongoUri, options);
    } else {
      // MongoDB Atlas connection (SSL handled automatically)
      await mongoose.connect(env.mongoUri, options);
    }
    
    const db = mongoose.connection;
    console.log('✅ MongoDB connected successfully');
    console.log(`   Database: ${db.name || 'default'}`);
    console.log(`   Host: ${db.host || 'N/A'}`);
    console.log(`   Ready State: ${db.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    
    // Connection event handlers
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    // More helpful error messages
    if (error.message.includes('IP') && error.message.includes('whitelist')) {
      console.error('\n🔒 IP WHITELIST ERROR - Your IP address is not allowed');
      console.error('   This happens when your IP address changed or you\'re on a different network.');
      console.error('\n   📋 How to fix:');
      console.error('   1. Go to MongoDB Atlas: https://cloud.mongodb.com/');
      console.error('   2. Navigate to: Network Access → IP Access List');
      console.error('   3. Click "Add IP Address"');
      console.error('   4. Click "Add Current IP Address" (or enter your IP manually)');
      console.error('   5. For development, you can use: 0.0.0.0/0 (allows all IPs)');
      console.error('      ⚠️  WARNING: Only use 0.0.0.0/0 for development, not production!');
      console.error('\n   🔍 Find your current IP: https://whatismyipaddress.com/');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('   → Make sure MongoDB is running on your system');
      console.error('   → Check if the MONGO_URI is correct');
    } else if (error.message.includes('authentication failed')) {
      console.error('   → Check your MongoDB username and password');
      console.error('   → Verify credentials in MongoDB Atlas → Database Access');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('   → Check your MongoDB host/URL');
      console.error('   → Verify connection string in MongoDB Atlas → Connect');
    } else if (error.message.includes('SSL') || error.message.includes('TLS')) {
      console.error('   → SSL/TLS error detected');
      console.error('   → For local MongoDB, use: mongodb://localhost:27017/dbname');
      console.error('   → For Atlas, ensure connection string is correct');
    }
    
    process.exit(1);
  }
};

module.exports = connectDatabase;


