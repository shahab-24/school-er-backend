"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_validation_1 = require("./auth.validation");
const auth_service_1 = require("./auth.service");
exports.AuthController = {
    async login(req, res) {
        console.log("🔥 LOGIN ROUTE HIT");
        try {
            console.log("🔐 Login request received");
            // 1. Validate input
            const { email, password } = auth_validation_1.loginSchema.parse(req.body);
            // 2. Call service
            const data = await auth_service_1.AuthService.login(email, password);
            // 3. Return success response
            res.json({
                ...data,
                timestamp: new Date().toISOString(),
            });
        }
        catch (error) {
            console.error("❌ Login controller error:", error);
            // Handle different error types
            let statusCode = 400;
            let message = "Login failed";
            if (error.name === "ZodError") {
                message = "Invalid input format";
            }
            else if (error.message.includes("credentials")) {
                statusCode = 401;
                message = error.message;
            }
            else if (error.message.includes("required")) {
                statusCode = 400;
                message = error.message;
            }
            res.status(statusCode).json({
                success: false,
                message,
                timestamp: new Date().toISOString(),
                // Only show error details in development
                ...(process.env.NODE_ENV === "development" && { error: error.message }),
            });
        }
    },
    async me(req, res) {
        res.json({
            success: true,
            user: req.user,
        });
    }
};
//# sourceMappingURL=auth.controller.js.map