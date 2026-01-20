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
var mongoose_1 = require("mongoose");
var app_1 = require("./app");
var index_1 = require("./config/index");
var logger_1 = require("./utils/logger");
var PORT = process.env.PORT || 5000;
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var server_1, gracefulShutdown_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                logger_1.Logger.info("🚀 Starting School Management Server...");
                logger_1.Logger.info("\uD83D\uDCC1 Environment: ".concat(process.env.NODE_ENV));
                // Connect to MongoDB
                return [4 /*yield*/, (0, index_1.connectDB)()];
            case 1:
                // Connect to MongoDB
                _a.sent();
                server_1 = app_1.default.listen(PORT, function () {
                    logger_1.Logger.info("\u2705 Server running on port ".concat(PORT));
                    logger_1.Logger.info("\uD83C\uDFEB School: ".concat(process.env.SCHOOL_NAME_EN));
                });
                gracefulShutdown_1 = function (signal) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        logger_1.Logger.info("\n".concat(signal, " received, starting graceful shutdown..."));
                        server_1.close(function () { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        logger_1.Logger.info("HTTP server closed");
                                        // Close MongoDB connection
                                        return [4 /*yield*/, mongoose_1.default.connection.close()];
                                    case 1:
                                        // Close MongoDB connection
                                        _a.sent();
                                        logger_1.Logger.info("MongoDB connection closed");
                                        process.exit(0);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        // Force close after 10 seconds
                        setTimeout(function () {
                            logger_1.Logger.error("Could not close connections in time, forcefully shutting down");
                            process.exit(1);
                        }, 10000);
                        return [2 /*return*/];
                    });
                }); };
                // Handle signals
                process.on("SIGTERM", function () { return gracefulShutdown_1("SIGTERM"); });
                process.on("SIGINT", function () { return gracefulShutdown_1("SIGINT"); });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                logger_1.Logger.error("❌ Failed to start server:", error_1.message);
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
startServer();
