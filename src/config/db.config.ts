import mongoose from "mongoose";
import { Logger } from "../utils/logger.js";

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;

    // Validate MONGO_URI
    if (!mongoURI) {
      Logger.error("MONGO_URI is not defined in environment variables");
      throw new Error("MongoDB connection string is missing");
    }

    // Connection options for MongoDB Atlas
    const options: mongoose.ConnectOptions = {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
      family: 4, // Use IPv4, skip trying IPv6
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 5, // Maintain at least 5 socket connections
      retryWrites: true,
      w: "majority",
      appName: "school-erp-backend",
    };

    await mongoose.connect(mongoURI, options);

    Logger.info("✅ MongoDB connected successfully");

    // Setup connection event listeners
    mongoose.connection.on("connected", () => {
      Logger.info("Mongoose connected to DB");
    });

    mongoose.connection.on("error", (err) => {
      Logger.error("Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      Logger.warn("Mongoose disconnected from DB");
    });
  } catch (error: any) {
    Logger.error("❌ MongoDB connection failed:", error.message);

    // Detailed error logging
    if (error.name === "MongoServerSelectionError") {
      Logger.error("Network issue or MongoDB Atlas cluster is down");
    } else if (error.name === "MongooseServerSelectionError") {
      Logger.error("Check your MongoDB connection string and network");
    }

    process.exit(1);
  }
};
