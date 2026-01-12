"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_js_1 = require("../utils/logger.js");
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        // Validate MONGO_URI
        if (!mongoURI) {
            logger_js_1.Logger.error("MONGO_URI is not defined in environment variables");
            throw new Error("MongoDB connection string is missing");
        }
        // Connection options for MongoDB Atlas
        const options = {
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds
            family: 4, // Use IPv4, skip trying IPv6
            maxPoolSize: 10, // Maintain up to 10 socket connections
            minPoolSize: 5, // Maintain at least 5 socket connections
            retryWrites: true,
            w: "majority",
            appName: "school-erp-backend",
        };
        await mongoose_1.default.connect(mongoURI, options);
        logger_js_1.Logger.info("✅ MongoDB connected successfully");
        // Setup connection event listeners
        mongoose_1.default.connection.on("connected", () => {
            logger_js_1.Logger.info("Mongoose connected to DB");
        });
        mongoose_1.default.connection.on("error", (err) => {
            logger_js_1.Logger.error("Mongoose connection error:", err);
        });
        mongoose_1.default.connection.on("disconnected", () => {
            logger_js_1.Logger.warn("Mongoose disconnected from DB");
        });
    }
    catch (error) {
        logger_js_1.Logger.error("❌ MongoDB connection failed:", error.message);
        // Detailed error logging
        if (error.name === "MongoServerSelectionError") {
            logger_js_1.Logger.error("Network issue or MongoDB Atlas cluster is down");
        }
        else if (error.name === "MongooseServerSelectionError") {
            logger_js_1.Logger.error("Check your MongoDB connection string and network");
        }
        process.exit(1);
    }
};
exports.connectDB = connectDB;
