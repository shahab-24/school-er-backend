"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
var mongoose_1 = require("mongoose");
var logger_js_1 = require("../utils/logger.js");
var connectDB = function () { return __awaiter(void 0, void 0, void 0, function () {
    var mongoURI, options, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                mongoURI = process.env.MONGO_URI;
                // Validate MONGO_URI
                if (!mongoURI) {
                    logger_js_1.Logger.error("MONGO_URI is not defined in environment variables");
                    throw new Error("MongoDB connection string is missing");
                }
                options = {
                    serverSelectionTimeoutMS: 30000, // 30 seconds
                    socketTimeoutMS: 45000, // 45 seconds
                    family: 4, // Use IPv4, skip trying IPv6
                    maxPoolSize: 10, // Maintain up to 10 socket connections
                    minPoolSize: 5, // Maintain at least 5 socket connections
                    retryWrites: true,
                    w: "majority",
                    appName: "school-erp-backend",
                };
                return [4 /*yield*/, mongoose_1.default.connect(mongoURI, options)];
            case 1:
                _a.sent();
                logger_js_1.Logger.info("✅ MongoDB connected successfully");
                // Setup connection event listeners
                mongoose_1.default.connection.on("connected", function () {
                    logger_js_1.Logger.info("Mongoose connected to DB");
                });
                mongoose_1.default.connection.on("error", function (err) {
                    logger_js_1.Logger.error("Mongoose connection error:", err);
                });
                mongoose_1.default.connection.on("disconnected", function () {
                    logger_js_1.Logger.warn("Mongoose disconnected from DB");
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                logger_js_1.Logger.error("❌ MongoDB connection failed:", error_1.message);
                // Detailed error logging
                if (error_1.name === "MongoServerSelectionError") {
                    logger_js_1.Logger.error("Network issue or MongoDB Atlas cluster is down");
                }
                else if (error_1.name === "MongooseServerSelectionError") {
                    logger_js_1.Logger.error("Check your MongoDB connection string and network");
                }
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.connectDB = connectDB;
