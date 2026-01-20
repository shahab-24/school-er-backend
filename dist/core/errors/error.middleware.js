"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    console.error("🔥 GLOBAL ERROR:", err);
    res.status(400).json({
        success: false,
        message: err.message || "Something went wrong",
    });
}
//# sourceMappingURL=error.middleware.js.map