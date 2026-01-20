"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = requestLogger;
var crypto_1 = require("crypto");
var logger_1 = require("./logger");
function requestLogger(req, _res, next) {
    req.requestId = (0, crypto_1.randomUUID)();
    logger_1.logger.info({
        requestId: req.requestId,
        method: req.method,
        path: req.path,
    }, "Incoming request");
    next();
}
