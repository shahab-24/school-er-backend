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
exports.StudentController = void 0;
var student_service_1 = require("./student.service");
var student_validation_1 = require("./student.validation");
exports.StudentController = {
    create: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var data, doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = student_validation_1.createStudentSchema.parse(req.body);
                        return [4 /*yield*/, student_service_1.StudentService.create(data)];
                    case 1:
                        doc = _a.sent();
                        res.status(201).json(doc);
                        return [2 /*return*/];
                }
            });
        });
    },
    list: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var docs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, student_service_1.StudentService.list(req.query)];
                    case 1:
                        docs = _a.sent();
                        res.json(docs);
                        return [2 /*return*/];
                }
            });
        });
    },
    get: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, student_service_1.StudentService.getByUid(req.params.studentUid)];
                    case 1:
                        doc = _a.sent();
                        if (!doc)
                            return [2 /*return*/, res.status(404).json({ message: "Not found" })];
                        res.json(doc);
                        return [2 /*return*/];
                }
            });
        });
    },
    updateStatus: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var status, doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        status = student_validation_1.updateStatusSchema.parse(req.body).status;
                        return [4 /*yield*/, student_service_1.StudentService.updateStatus(req.params.studentUid, status)];
                    case 1:
                        doc = _a.sent();
                        res.json(doc);
                        return [2 /*return*/];
                }
            });
        });
    },
    promote: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var entry, doc;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entry = student_validation_1.promoteSchema.parse(req.body);
                        return [4 /*yield*/, student_service_1.StudentService.promote(req.params.studentUid, entry)];
                    case 1:
                        doc = _a.sent();
                        res.json(doc);
                        return [2 /*return*/];
                }
            });
        });
    },
    updateStipendBeneficiary: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var studentUid, data, student;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        studentUid = req.params.studentUid;
                        data = req.body;
                        return [4 /*yield*/, student_service_1.StudentService.updateStipendBeneficiary(studentUid, data)];
                    case 1:
                        student = _a.sent();
                        res.json({
                            success: true,
                            message: "Stipend beneficiary updated successfully",
                            data: student.stipendBeneficiary,
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
    getStipendBeneficiary: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var studentUid, beneficiary;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        studentUid = req.params.studentUid;
                        return [4 /*yield*/, student_service_1.StudentService.getStipendBeneficiary(studentUid)];
                    case 1:
                        beneficiary = _a.sent();
                        res.json({
                            success: true,
                            data: beneficiary,
                        });
                        return [2 /*return*/];
                }
            });
        });
    },
};
