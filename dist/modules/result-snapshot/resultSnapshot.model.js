"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultSnapshot = void 0;
const mongoose_1 = require("mongoose");
const SubjectSnapshotSchema = new mongoose_1.Schema({
    subjectId: { type: String, required: true },
    normalized: { type: Map, of: Number, required: true }, // examKey -> normalized mark
    final: { type: Number, required: true },
    failed: { type: Boolean, default: false },
}, { _id: false });
const ResultSnapshotSchema = new mongoose_1.Schema({
    // scope
    scope: { type: String, enum: ["terminal", "annual"], required: true },
    terminalKey: { type: String }, // e.g. first_terminal (only for terminal)
    // identity
    session: { type: String, required: true, index: true },
    class: { type: Number, required: true, index: true },
    studentId: { type: String, required: true, index: true },
    // references (for traceability)
    resultConfigId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    academicRecordId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    // result data
    subjects: { type: [SubjectSnapshotSchema], required: true },
    total: { type: Number, required: true },
    percentage: { type: Number, required: true },
    failed: { type: Boolean, default: false },
    // placement (filled later)
    position: { type: Number },
    // lock
    publishedAt: { type: Date, default: Date.now },
}, { timestamps: true });
// one snapshot per student per scope+terminal+session+class
ResultSnapshotSchema.index({ scope: 1, terminalKey: 1, session: 1, class: 1, studentId: 1 }, { unique: true });
exports.ResultSnapshot = (0, mongoose_1.model)("ResultSnapshot", ResultSnapshotSchema);
//# sourceMappingURL=resultSnapshot.model.js.map