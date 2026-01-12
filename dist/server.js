"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_js_1 = __importDefault(require("./app.js"));
const index_js_1 = require("./config/index.js");
const logger_js_1 = require("./utils/logger.js");
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        logger_js_1.Logger.info("🚀 Starting School Management Server...");
        logger_js_1.Logger.info(`📁 Environment: ${process.env.NODE_ENV}`);
        // Connect to MongoDB
        await (0, index_js_1.connectDB)();
        // Start server
        const server = app_js_1.default.listen(PORT, () => {
            logger_js_1.Logger.info(`✅ Server running on port ${PORT}`);
            logger_js_1.Logger.info(`🏫 School: ${process.env.SCHOOL_NAME_EN}`);
        });
        // Graceful shutdown
        const gracefulShutdown = async (signal) => {
            logger_js_1.Logger.info(`\n${signal} received, starting graceful shutdown...`);
            server.close(async () => {
                logger_js_1.Logger.info("HTTP server closed");
                // Close MongoDB connection
                await mongoose_1.default.connection.close();
                logger_js_1.Logger.info("MongoDB connection closed");
                process.exit(0);
            });
            // Force close after 10 seconds
            setTimeout(() => {
                logger_js_1.Logger.error("Could not close connections in time, forcefully shutting down");
                process.exit(1);
            }, 10000);
        };
        // Handle signals
        process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
        process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    }
    catch (error) {
        logger_js_1.Logger.error("❌ Failed to start server:", error.message);
        process.exit(1);
    }
};
startServer();
