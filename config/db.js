import mongoose from "mongoose";
import logger from "./logger.js";

const connectDB = async () => {
  try {
    logger.info("Attempting to connect to MongoDB...");
    console.log(
      "Using URI:",
      process.env.MONGODB_URI.replace(/:[^:/@]+@/, ":****@")
    ); // Safely log URI without password

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s
    });

    logger.info(`🌿 MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    logger.error(`❌ MongoDB Connection Error: ${error.message}`);
    logger.error("Full error:", error); // Log full error object
    process.exit(1);
  }
};

mongoose.connection.on("disconnected", () => {
  logger.warn("❌ MongoDB Disconnected");
});

mongoose.connection.on("error", (err) => {
  logger.error(`❌ MongoDB Error: ${err.message}`);
});

// Add connection event listeners for more debugging
mongoose.connection.on("connecting", () => {
  logger.info("🔄 Connecting to MongoDB...");
});

mongoose.connection.on("connected", () => {
  logger.info("✅ Connected to MongoDB");
});

export default connectDB;
