"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var compression_1 = require("compression");
var express_rate_limit_1 = require("express-rate-limit");
var index_1 = require("./config/index");
var logger_1 = require("./utils/logger");
var mongoose_1 = require("mongoose");
var routes_1 = require("./routes");
var requestLogger_middleware_1 = require("./core/logger/requestLogger.middleware");
var error_middleware_1 = require("./core/errors/error.middleware");
var rateLimit_1 = require("./core/security/rateLimit");
var rateLimit_2 = require("./core/security/rateLimit");
var app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === "production"
        ? ["https://yourdomain.com"]
        : ["http://localhost:3000"],
    credentials: true,
}));
// Performance middleware
app.use((0, compression_1.default)());
// Body parsing with limits
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
// Rate limiting
var limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
});
app.use("/api", limiter);
// Health check endpoint
app.get("/health", function (_req, res) {
    var healthStatus = {
        status: "ok",
        timestamp: new Date().toISOString(),
        school: index_1.schoolConfig.nameEn,
        established: index_1.schoolConfig.established,
        environment: process.env.NODE_ENV,
        database: mongoose_1.default.connection.readyState === 1 ? "connected" : "disconnected",
        uptime: process.uptime(),
        memory: process.memoryUsage(),
    };
    res.json(healthStatus);
});
// Error handling middleware
app.use(function (err, req, res, next) {
    logger_1.Logger.error("Unhandled error:", err);
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === "production"
            ? "Internal server error"
            : err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
});
app.use("/api/v1", routes_1.default);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// 🔹 Request logger (first)
app.use(requestLogger_middleware_1.requestLogger);
// 🔹 Routes
app.use("/api/v1", routes_1.default);
// 🔹 Error handler (last)
app.use(error_middleware_1.errorHandler);
app.use("/api/v1/auth", rateLimit_1.authLimiter);
app.use("/api/v1/public", rateLimit_2.publicLimiter);
// 404 handler
app.use("*", function (req, res) {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.originalUrl,
    });
});
exports.default = app;
