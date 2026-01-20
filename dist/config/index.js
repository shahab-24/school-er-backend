"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnvironment = exports.connectDB = exports.schoolConfig = void 0;
// src/config/index.ts - PRODUCTION READY VERSION
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../utils/logger");
dotenv_1.default.config();
// School configuration
exports.schoolConfig = {
    nameEn: process.env.SCHOOL_NAME_EN || "School Name",
    nameBn: process.env.SCHOOL_NAME_BN || "বিদ্যালয়ের নাম",
    established: parseInt(process.env.SCHOOL_ESTABLISHED || "2000"),
    phone: process.env.SCHOOL_PHONE || "",
    address: process.env.SCHOOL_ADDRESS || "",
    email: process.env.SCHOOL_EMAIL || "",
    logoUrl: process.env.SCHOOL_LOGO_URL || "/logo.png",
};
// Database connection function
const connectDB = async (options) => {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        // Connection options
        const connectionOptions = {
            ...options,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4, // Use IPv4, skip trying IPv6
        };
        // Connect to MongoDB
        await mongoose_1.default.connect(mongoUri, connectionOptions);
        // Connection event handlers
        mongoose_1.default.connection.on("connected", () => {
            logger_1.Logger.info(`✅ MongoDB connected to: ${mongoose_1.default.connection.name}`);
        });
        mongoose_1.default.connection.on("error", (error) => {
            logger_1.Logger.error("❌ MongoDB connection error:", error);
        });
        mongoose_1.default.connection.on("disconnected", () => {
            logger_1.Logger.warn("⚠️ MongoDB disconnected");
        });
        // Handle process termination
        process.on("SIGINT", async () => {
            await mongoose_1.default.connection.close();
            logger_1.Logger.info("MongoDB connection closed due to app termination");
            process.exit(0);
        });
    }
    catch (error) {
        logger_1.Logger.error("❌ Failed to connect to MongoDB:", error.message);
        // Provide helpful error messages
        if (error.name === "MongoServerSelectionError") {
            logger_1.Logger.error("💡 Tip: Check your MongoDB Atlas connection string and network access");
        }
        throw error;
    }
};
exports.connectDB = connectDB;
// Environment validation
const validateEnvironment = () => {
    const required = ["MONGO_URI", "JWT_SECRET", "SCHOOL_NAME_EN"];
    const missing = required.filter((key) => !process.env[key]);
    if (missing.length > 0) {
        logger_1.Logger.error("❌ Missing required environment variables:", missing);
        throw new Error(`Missing environment variables: ${missing.join(", ")}`);
    }
    // Validate JWT secret length in production
    if (process.env.NODE_ENV === "production" && process.env.JWT_SECRET) {
        if (process.env.JWT_SECRET.length < 32) {
            logger_1.Logger.warn("⚠️ JWT_SECRET is less than 32 characters - not secure for production");
        }
    }
    logger_1.Logger.info("✅ Environment validation passed");
    return true;
};
exports.validateEnvironment = validateEnvironment;
// Export configuration
exports.default = {
    schoolConfig: exports.schoolConfig,
    connectDB: exports.connectDB,
    validateEnvironment: exports.validateEnvironment,
};
//# sourceMappingURL=index.js.map