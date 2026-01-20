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
exports.StudentService = void 0;
var student_model_1 = require("./student.model");
var errors_1 = require("../../core/errors/");
exports.StudentService = {
    create: function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, student_model_1.Student.create(payload)];
            });
        });
    },
    list: function (query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, student_model_1.Student.find(query).lean()];
            });
        });
    },
    getByUid: function (studentUid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, student_model_1.Student.findOne({ studentUid: studentUid }).lean()];
            });
        });
    },
    updateStatus: function (studentUid, status) {
        return __awaiter(this, void 0, void 0, function () {
            var update;
            return __generator(this, function (_a) {
                update = { status: status };
                if (status === "archived")
                    update.archivedAt = new Date();
                return [2 /*return*/, student_model_1.Student.findOneAndUpdate({ studentUid: studentUid }, update, {
                        new: true,
                    }).lean()];
            });
        });
    },
    promote: function (studentUid, entry) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, student_model_1.Student.findOneAndUpdate({ studentUid: studentUid }, {
                        $push: { promotions: entry },
                        $set: {
                            status: entry.result === "repeat" ? "repeat" : "active",
                            "current.class": entry.toClass,
                            "current.roll": entry.newRoll,
                        },
                    }, { new: true }).lean()];
            });
        });
    },
    updateStipendBeneficiary: function (studentUid, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var student;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, student_model_1.Student.findOne({ studentUid: studentUid })];
                    case 1:
                        student = _c.sent();
                        if (!student)
                            throw new errors_1.NotFoundError("Student not found");
                        if (!payload.name || !payload.mobile) {
                            throw new errors_1.BadRequestError("Name and mobile are required");
                        }
                        student.stipendBeneficiary = {
                            name: payload.name,
                            mobile: payload.mobile,
                            relation: (_a = payload.relation) !== null && _a !== void 0 ? _a : "guardian",
                            paymentMethod: (_b = payload.paymentMethod) !== null && _b !== void 0 ? _b : "mobile_banking",
                            walletProvider: payload.walletProvider,
                            isActive: true,
                            updatedAt: new Date(),
                        };
                        return [4 /*yield*/, student.save()];
                    case 2:
                        _c.sent();
                        return [2 /*return*/, student];
                }
            });
        });
    },
    getStipendBeneficiary: function (studentUid) {
        return __awaiter(this, void 0, void 0, function () {
            var student;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, student_model_1.Student.findOne({ studentUid: studentUid }, { stipendBeneficiary: 1 }).lean()];
                    case 1:
                        student = _a.sent();
                        if (!student)
                            throw new errors_1.NotFoundError("Student not found");
                        return [2 /*return*/, student.stipendBeneficiary];
                }
            });
        });
    },
};
