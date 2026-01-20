"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var httpErrors_1 = require("../httpErrors");
var auth = function () {
    return function (req, _res, next) {
        var authHeader = req.headers.authorization;
        if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer "))) {
            throw new httpErrors_1.UnauthorizedError("Token missing");
        }
        var token = authHeader.split(" ")[1];
        try {
            var decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = {
                userId: decoded.userId,
                role: decoded.role,
            };
            next();
        }
        catch (_a) {
            throw new httpErrors_1.UnauthorizedError("Invalid token");
        }
    };
};
exports.auth = auth;
