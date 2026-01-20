"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
var httpErrors_1 = require("../httpErrors");
var requireRole = function () {
    var allowedRoles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        allowedRoles[_i] = arguments[_i];
    }
    return function (req, _res, next) {
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
