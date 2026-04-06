const mongoose = require('mongoose');

/**
 * Connects to MongoDB using only process.env.MONGODB_URI (no fallbacks, no hardcoded URI).
 * @throws {Error} if MONGODB_URI is missing
 */
async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required');
  }

  console.log('Using DB:', process.env.MONGODB_URI);

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected');
}

module.exports = { connectDB };
