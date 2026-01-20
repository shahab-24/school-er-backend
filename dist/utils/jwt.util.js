"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJwt = signJwt;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signJwt(payload, secret, options) {
    return jsonwebtoken_1.default.sign(payload, secret, options);
}
//# sourceMappingURL=jwt.util.js.map