import mongoose from "mongoose";
import app from "./app.js";
import { connectDB } from "./config/index.js";
import { Logger } from "./utils/logger.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    Logger.info("🚀 Starting School Management Server...");
    Logger.info(`📁 Environment: ${process.env.NODE_ENV}`);

    // Connect to MongoDB
    await connectDB();

    // Start server
    const server = app.listen(PORT, () => {
      Logger.info(`✅ Server running on port ${PORT}`);
      Logger.info(`🏫 School: ${process.env.SCHOOL_NAME_EN}`);
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal: string) => {
      Logger.info(`\n${signal} received, starting graceful shutdown...`);

      server.close(async () => {
        Logger.info("HTTP server closed");

        // Close MongoDB connection
        await mongoose.connection.close();
        Logger.info("MongoDB connection closed");

        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        Logger.error(
          "Could not close connections in time, forcefully shutting down"
        );
        process.exit(1);
      }, 10000);
    };

    // Handle signals
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error: any) {
    Logger.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
