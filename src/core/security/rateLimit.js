"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicLimiter = exports.authLimiter = void 0;
var express_rate_limit_1 = require("express-rate-limit");
exports.authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: "Too many login attempts. Try later.",
});
exports.publicLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    max: 100,
});
