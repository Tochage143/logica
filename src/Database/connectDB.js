import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI in your environment variables');
}

// Global caching for hot-reloading in development
let cached = global.mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
    })
    .then((mongoose) => {
      console.log('✅ MongoDB connected successfully:', mongoose.connection.host);
      return mongoose;
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset promise on failure
    throw error;
  }

  global.mongoose = cached; // Store in global for caching
  return cached.conn;
}
