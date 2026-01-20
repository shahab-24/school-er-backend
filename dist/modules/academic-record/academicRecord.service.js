"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicRecordService = void 0;
const academicRecord_model_1 = require("./academicRecord.model");
const academicRecord_publisher_1 = require("./academicRecord.publisher");
exports.AcademicRecordService = {
    async upsertDraft(payload) {
        // only DRAFT editable
        const q = {
            studentId: payload.studentId,
            session: payload.session,
            class: payload.class,
            scope: payload.scope,
            terminalKey: payload.terminalKey,
        };
        const existing = await academicRecord_model_1.AcademicRecord.findOne(q);
        if (existing && existing.status !== "DRAFT") {
            throw new Error("Record is not editable");
        }
        return academicRecord_model_1.AcademicRecord.findOneAndUpdate(q, { $set: { marks: payload.marks } }, { upsert: true, new: true }).lean();
    },
    async submit(q) {
        return academicRecord_model_1.AcademicRecord.findOneAndUpdate({ ...q, status: "DRAFT" }, { status: "SUBMITTED", submittedAt: new Date() }, { new: true }).lean();
    },
    async unlock(q) {
        return academicRecord_model_1.AcademicRecord.findOneAndUpdate({ ...q, status: "SUBMITTED" }, { status: "DRAFT", submittedAt: undefined }, { new: true }).lean();
    },
    async publish(query, actor) {
        return (0, academicRecord_publisher_1.publishAndGenerateResult)(query, actor);
    },
    async listByClass(filter) {
        return academicRecord_model_1.AcademicRecord.find(filter).lean();
    },
};
//# sourceMappingURL=academicRecord.service.js.map