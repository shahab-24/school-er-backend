"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpErrors_1 = require("../httpErrors");
const auth = () => {
    return (req, _res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            throw new httpErrors_1.UnauthorizedError("Token missing");
        }
        const token = authHeader.split(" ")[1];
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = {
                userId: decoded.userId,
                role: decoded.role,
            };
            next();
        }
        catch {
            throw new httpErrors_1.UnauthorizedError("Invalid token");
        }
    };
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map