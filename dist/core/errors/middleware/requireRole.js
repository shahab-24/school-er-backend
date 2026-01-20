"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const httpErrors_1 = require("../httpErrors");
const requireRole = (...allowedRoles) => {
    return (req, _res, next) => {
        if (!req.user) {
            throw new httpErrors_1.ForbiddenError("Access denied");
        }
        if (!allowedRoles.includes(req.user.role)) {
            throw new httpErrors_1.ForbiddenError("Insufficient permission");
        }
        next();
    };
};
exports.requireRole = requireRole;
//# sourceMappingURL=requireRole.js.map