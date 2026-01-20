"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
var AppError_1 = require("./AppError");
var logger_1 = require("../logger/logger");
function errorHandler(err, req, res, _next) {
    var isAppError = err instanceof AppError_1.AppError;
    var status = isAppError ? err.statusCode : 500;
    var message = isAppError ? err.message : "Internal server error";
    // 🔴 Log full error (server-side only)
    logger_1.logger.error({
        err: err,
        requestId: req.requestId,
        path: req.path,
        method: req.method,
    }, "Request failed");
    res.status(status).json({
        success: false,
        message: message,
        requestId: req.requestId,
    });
}
