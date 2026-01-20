"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
var jsonwebtoken_1 = require("jsonwebtoken");
var JWT_SECRET = process.env.JWT_SECRET;
function authenticate(req, res, next) {
    var header = req.headers.authorization;
    if (!header)
        return res.status(401).json({ message: "No token" });
    var token = header.replace("Bearer ", "");
    try {
        var decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (_a) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
