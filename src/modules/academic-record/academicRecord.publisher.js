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
exports.publishAndGenerateResult = publishAndGenerateResult;
// src/modules/academic-record/academicRecord.publisher.ts
var mongoose_1 = require("mongoose");
var httpErrors_1 = require("../../core/errors/httpErrors");
var academicRecord_model_1 = require("./academicRecord.model");
var resultSnapshot_model_1 = require("../result-snapshot/resultSnapshot.model");
var resultConfig_model_1 = require("../result-config/resultConfig.model");
var resultEngine_1 = require("../result-engine/resultEngine");
var typesafe_wrapper_1 = require("../../utils/typesafe-wrapper"); // ADD THIS
function publishAndGenerateResult(query, actor) {
    return __awaiter(this, void 0, void 0, function () {
        var session, record, config, configPlain, result, e_1, err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // ✅ AUTHORIZATION — এখানেই
                    if (actor.role !== "SCHOOL_ADMIN" && actor.role !== "SUPER_ADMIN") {
                        throw new httpErrors_1.ForbiddenError("Only admin can publish result");
                    }
                    return [4 /*yield*/, mongoose_1.default.startSession()];
                case 1:
                    session = _b.sent();
                    session.startTransaction();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 11, 13, 14]);
                    return [4 /*yield*/, academicRecord_model_1.AcademicRecord.findOne(query).session(session)];
                case 3:
                    record = _b.sent();
                    if (!record) {
                        throw new httpErrors_1.NotFoundError("Academic record not found");
                    }
                    if (record.status !== "SUBMITTED") {
                        throw new httpErrors_1.ConflictError("Only submitted record can be published");
                    }
                    return [4 /*yield*/, resultConfig_model_1.ResultConfig.findOne({
                            session: record.session,
                            class: record.class,
                            isActive: true,
                        }).session(session)];
                case 4:
                    config = _b.sent();
                    if (!config) {
                        throw new httpErrors_1.NotFoundError("Active result config not found");
                    }
                    configPlain = config.toObject();
                    if ((_a = configPlain.aggregation) === null || _a === void 0 ? void 0 : _a.weights) {
                        configPlain.aggregation.weights = (0, typesafe_wrapper_1.convertMapToRecord)(configPlain.aggregation.weights);
                    }
                    result = (0, resultEngine_1.calculateResults)([
                        {
                            studentId: record.studentId,
                            session: record.session,
                            class: record.class,
                            marks: record.marks,
                        },
                    ], configPlain, // USE FIXED CONFIG HERE
                    {
                        scope: record.scope,
                        terminalKeyPrefix: record.scope === "terminal" ? record.terminalKey : undefined,
                    })[0];
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, resultSnapshot_model_1.ResultSnapshot.create([
                            {
                                studentId: result.studentId,
                                session: record.session,
                                class: record.class,
                                scope: record.scope,
                                terminalKey: record.terminalKey,
                                academicRecordId: record._id,
                                resultConfigId: config._id,
                                subjects: Object.entries(result.subjects).map(function (_a) {
                                    var subjectId = _a[0], s = _a[1];
                                    return ({
                                        subjectId: subjectId,
                                        normalized: s.normalized,
                                        final: s.final,
                                        failed: s.failed,
                                    });
                                }),
                                total: result.total,
                                percentage: result.percentage,
                                failed: result.failed,
                            },
                        ], { session: session })];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 8];
                case 7:
                    e_1 = _b.sent();
                    // ✅ IDEMPOTENCY — এখানেই
                    if (e_1.code === 11000) {
                        throw new httpErrors_1.ConflictError("Result already published");
                    }
                    throw e_1;
                case 8:
                    record.status = "PUBLISHED";
                    record.publishedAt = new Date();
                    return [4 /*yield*/, record.save({ session: session })];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, session.commitTransaction()];
                case 10:
                    _b.sent();
                    return [2 /*return*/, { success: true }];
                case 11:
                    err_1 = _b.sent();
                    return [4 /*yield*/, session.abortTransaction()];
                case 12:
                    _b.sent();
                    throw err_1;
                case 13:
                    session.endSession();
                    return [7 /*endfinally*/];
                case 14: return [2 /*return*/];
            }
        });
    });
}
