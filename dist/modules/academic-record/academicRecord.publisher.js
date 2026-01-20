"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishAndGenerateResult = publishAndGenerateResult;
// src/modules/academic-record/academicRecord.publisher.ts - FIXED VERSION
const mongoose_1 = __importDefault(require("mongoose"));
const httpErrors_1 = require("../../core/errors/httpErrors");
const academicRecord_model_1 = require("./academicRecord.model");
const resultSnapshot_model_1 = require("../result-snapshot/resultSnapshot.model");
const resultConfig_model_1 = require("../result-config/resultConfig.model");
const resultEngine_1 = require("../result-engine/resultEngine");
const typesafe_wrapper_1 = require("../../utils/typesafe-wrapper");
async function publishAndGenerateResult(query, actor) {
    // ✅ AUTHORIZATION
    if (actor.role !== "SCHOOL_ADMIN" && actor.role !== "SUPER_ADMIN") {
        throw new httpErrors_1.ForbiddenError("Only admin can publish result");
    }
    const session = await mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const record = await academicRecord_model_1.AcademicRecord.findOne(query).session(session);
        if (!record) {
            throw new httpErrors_1.NotFoundError("Academic record not found");
        }
        if (record.status !== "SUBMITTED") {
            throw new httpErrors_1.ConflictError("Only submitted record can be published");
        }
        const config = await resultConfig_model_1.ResultConfig.findOne({
            session: record.session,
            class: record.class,
            isActive: true,
        }).session(session);
        if (!config) {
            throw new httpErrors_1.NotFoundError("Active result config not found");
        }
        // FIX: Use the new converter function
        const configForCalculation = (0, typesafe_wrapper_1.convertForCalculation)(config);
        // ✅ FIX 1: Type-safe terminalKeyPrefix
        const engineOptions = {
            scope: record.scope,
        };
        // Only add terminalKeyPrefix if it exists and scope is terminal
        if (record.scope === "terminal" && record.terminalKey) {
            engineOptions.terminalKeyPrefix = String(record.terminalKey);
        }
        const [result] = (0, resultEngine_1.calculateResults)([
            {
                studentId: record.studentId,
                session: record.session,
                class: record.class,
                marks: record.marks,
            },
        ], configForCalculation, engineOptions // ✅ Use the type-safe options
        );
        try {
            await resultSnapshot_model_1.ResultSnapshot.create([
                {
                    studentId: result.studentId,
                    session: record.session,
                    class: record.class,
                    scope: record.scope,
                    terminalKey: record.terminalKey,
                    academicRecordId: record._id,
                    resultConfigId: config._id,
                    subjects: Object.entries(result.subjects).map(([subjectId, s]) => ({
                        subjectId,
                        normalized: s.normalized,
                        final: s.final,
                        failed: s.failed,
                    })),
                    total: result.total,
                    percentage: result.percentage,
                    failed: result.failed,
                },
            ], { session });
        }
        catch (e) {
            // ✅ IDEMPOTENCY
            if (e.code === 11000) {
                throw new httpErrors_1.ConflictError("Result already published");
            }
            throw e;
        }
        record.status = "PUBLISHED";
        record.publishedAt = new Date();
        await record.save({ session });
        await session.commitTransaction();
        return { success: true };
    }
    catch (err) {
        await session.abortTransaction();
        throw err;
    }
    finally {
        session.endSession();
    }
}
//# sourceMappingURL=academicRecord.publisher.js.map