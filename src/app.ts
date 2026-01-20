// src/app.ts - PRODUCTION READY VERSION
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { schoolConfig } from "./config";
import { Logger } from "./utils/logger";
import mongoose from "mongoose";
import routes from "./routes";
import { requestLogger } from "./core/logger/requestLogger.middleware";
import { errorHandler } from "./core/errors/error.middleware";
import { authLimiter, publicLimiter } from "./core/security/rateLimit";

const app = express();

// ========== SECURITY MIDDLEWARE ==========
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://yourdomain.com", "https://www.yourdomain.com"]
      : ["http://localhost:3000", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// ========== PERFORMANCE MIDDLEWARE ==========
app.use(compression());

// ========== BODY PARSING ==========
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ========== LOGGING MIDDLEWARE ==========
app.use(requestLogger);

// ========== RATE LIMITING ==========
// Global rate limiter
const globalLimiter = rateLimit({
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
  const dbStatus =
    mongoose.connection.readyState === 1 ? "connected" : "disconnected";

  const healthStatus = {
    status: "ok",
    timestamp: new Date().toISOString(),
    school: schoolConfig.nameEn,
    established: schoolConfig.established,
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
    school: schoolConfig.nameEn,
    documentation: "/api-docs",
    health: "/health",
    timestamp: new Date().toISOString(),
  });
});

// ========== API ROUTES ==========
// Apply specific rate limiters before routes
app.use("/api/v1/auth", authLimiter);
app.use("/api/v1/public", publicLimiter);

// Mount all routes under /api/v1
app.use("/api/v1", routes);

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
app.use(errorHandler);

export default app;
