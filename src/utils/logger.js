"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
// src/utils/logger.ts
var winston_1 = require("winston");
var logger = winston_1.default.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.json()),
    defaultMeta: { service: "school-erp-backend" },
    transports: [
        // Write to console
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.printf(function (_a) {
                var timestamp = _a.timestamp, level = _a.level, message = _a.message;
                return "".concat(timestamp, " ").concat(level, ": ").concat(message);
            })),
        }),
        // Write to file
        new winston_1.default.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
        new winston_1.default.transports.File({
            filename: "logs/combined.log",
        }),
    ],
});
exports.Logger = logger;
