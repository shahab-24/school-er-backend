"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultSnapshotService = void 0;
const resultSnapshot_model_1 = require("./resultSnapshot.model");
exports.ResultSnapshotService = {
    async publish(payload) {
        // enforce terminalKey when scope=terminal
        if (payload.scope === "terminal" && !payload.terminalKey) {
            throw new Error("terminalKey is required for terminal scope");
        }
        // bulk insert as transaction-like behavior
        const docs = payload.results.map((r) => ({
            scope: payload.scope,
            terminalKey: payload.scope === "terminal" ? payload.terminalKey : undefined,
            session: payload.session,
            class: payload.class,
            studentId: r.studentId,
            academicRecordId: r.academicRecordId,
            resultConfigId: payload.resultConfigId,
            subjects: r.subjects,
            total: r.total,
            percentage: r.percentage,
            failed: r.failed,
        }));
        return resultSnapshot_model_1.ResultSnapshot.insertMany(docs, { ordered: true });
    },
    async listByClass(params) {
        const q = {
            scope: params.scope,
            session: params.session,
            class: params.class,
        };
        if (params.scope === "terminal")
            q.terminalKey = params.terminalKey;
        return resultSnapshot_model_1.ResultSnapshot.find(q).lean();
    },
    async getStudent(params) {
        const q = {
            studentId: params.studentId,
            scope: params.scope,
            session: params.session,
        };
        if (params.scope === "terminal")
            q.terminalKey = params.terminalKey;
        return resultSnapshot_model_1.ResultSnapshot.findOne(q).lean();
    },
};
//# sourceMappingURL=resultSnapshot.service.js.map