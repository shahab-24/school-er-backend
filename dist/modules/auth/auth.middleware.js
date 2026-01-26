"use strict";
// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "development-secret";
const authenticate = () => {
    return (req, res, next) => {
        try {
            // 1. Get token from header
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({
                    success: false,
                    message: "No token provided"
                });
            }
            const token = authHeader.split(" ")[1];
            // 2. Verify token
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            // 3. Attach user to request
            req.user = {
                userId: decoded.userId,
                role: decoded.role,
                email: decoded.email
            };
            next();
        }
        catch (error) {
            console.error("Authentication error:", error.message);
            if (error.name === "JsonWebTokenError") {
                return res.status(401).json({
                    success: false,
                    message: "Invalid token"
                });
            }
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({
                    success: false,
                    message: "Token expired"
                });
            }
            res.status(500).json({
                success: false,
                message: "Authentication failed"
            });
        }
    };
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map