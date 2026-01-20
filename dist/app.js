"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts - PRODUCTION READY VERSION
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = require("./config");
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = __importDefault(require("./routes"));
const requestLogger_middleware_1 = require("./core/logger/requestLogger.middleware");
const error_middleware_1 = require("./core/errors/error.middleware");
const rateLimit_1 = require("./core/security/rateLimit");
const app = (0, express_1.default)();
// ========== SECURITY MIDDLEWARE ==========
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));
// CORS configuration
const corsOptions = {
    origin: process.env.NODE_ENV === "production"
        ? ["https://yourdomain.com", "https://www.yourdomain.com"]
        : ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use((0, cors_1.default)(corsOptions));
// ========== PERFORMANCE MIDDLEWARE ==========
app.use((0, compression_1.default)());
// ========== BODY PARSING ==========
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
// ========== LOGGING MIDDLEWARE ==========
app.use(requestLogger_middleware_1.requestLogger);
// ========== RATE LIMITING ==========
// Global rate limiter
const globalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        success: false,
        message: "Too many requests from this IP, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});
// Apply global limiter to all routes
app.use("/api", globalLimiter);
// ========== HEALTH CHECK ==========
app.get("/health", (_req, res) => {
    const dbStatus = mongoose_1.default.connection.readyState === 1 ? "connected" : "disconnected";
    const healthStatus = {
        status: "ok",
        timestamp: new Date().toISOString(),
        school: config_1.schoolConfig.nameEn,
        established: config_1.schoolConfig.established,
        environment: process.env.NODE_ENV || "development",
        database: dbStatus,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        nodeVersion: process.version,
        pid: process.pid,
    };
    res.status(200).json(healthStatus);
});
// ========== ROOT ROUTE ==========
app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "School ERP API",
        version: "1.0.0",
        school: config_1.schoolConfig.nameEn,
        documentation: "/api-docs",
        health: "/health",
        timestamp: new Date().toISOString(),
    });
});
// ========== API ROUTES ==========
// Apply specific rate limiters before routes
app.use("/api/v1/auth", rateLimit_1.authLimiter);
app.use("/api/v1/public", rateLimit_1.publicLimiter);
// Mount all routes under /api/v1
app.use("/api/v1", routes_1.default);
// ========== ERROR HANDLING ==========
// 404 handler - MUST BE BEFORE errorHandler
app.use("*", (_req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: _req.originalUrl,
        timestamp: new Date().toISOString(),
    });
});
// Global error handler - MUST BE LAST
app.use(error_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map