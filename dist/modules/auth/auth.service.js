"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
// src/modules/auth/auth.service.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_model_1 = require("./auth.model");
const typesafe_wrapper_1 = require("../../utils/typesafe-wrapper");
const env_1 = require("../../core/config/env"); // ✅ MUST
// import { signJwt } from "../../utils/jwt.util";
const JWT_SECRET = env_1.env.JWT_SECRET; // ✅ validated, never undefined
const JWT_EXPIRES = env_1.env.JWT_EXPIRES_IN ?? "7d";
exports.AuthService = {
    async login(email, password) {
        try {
            // 1. Input validation
            if (!email || !password) {
                throw new Error("Email and password are required");
            }
            // 2. Find user (case insensitive)
            const user = await auth_model_1.User.findOne({
                email: email.toLowerCase().trim(),
                isActive: true,
            });
            if (!user) {
                throw new Error("Invalid credentials");
            }
            if (!user.passwordHash) {
                throw new Error("Account not properly configured");
            }
            // 3. Verify password
            const ok = await bcryptjs_1.default.compare(password, user.passwordHash);
            if (!ok) {
                throw new Error("Invalid credentials");
            }
            // 4. Create payload with proper user._id
            const payload = {
                userId: user._id.toString(), // ✅ FIX: user._id not user.id
                role: user.role,
                // email: user.email,
            };
            // 5. Generate token
            const token = (0, typesafe_wrapper_1.safeJwtSign)(payload, JWT_SECRET, {
                expiresIn: JWT_EXPIRES,
            });
            // 6. Return response
            return {
                success: true,
                token,
                role: user.role,
                user: {
                    id: user._id,
                    email: user.email,
                    // name: user.name,
                    role: user.role,
                },
            };
        }
        catch (error) {
            console.error("AuthService.login error:", error);
            throw error; // Re-throw for controller
        }
    },
};
//# sourceMappingURL=auth.service.js.map