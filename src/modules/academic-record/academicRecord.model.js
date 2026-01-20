"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicRecord = void 0;
var mongoose_1 = require("mongoose");
var MarksSchema = new mongoose_1.Schema({}, { strict: false, _id: false });
var AcademicRecordSchema = new mongoose_1.Schema({
    studentId: { type: String, required: true, index: true },
    session: { type: String, required: true, index: true },
    class: { type: Number, required: true, index: true },
    scope: { type: String, enum: ["terminal", "annual"], required: true },
    terminalKey: { type: String },
    marks: { type: MarksSchema, required: true },
    status: {
        type: String,
        enum: ["DRAFT", "SUBMITTED", "PUBLISHED"],
        default: "DRAFT",
        index: true,
    },
    submittedAt: Date,
    publishedAt: Date,
}, { timestamps: true });
// uniqueness: one record per student per scope+terminal+session+class
AcademicRecordSchema.index({ studentId: 1, session: 1, class: 1, scope: 1, terminalKey: 1 }, { unique: true });
exports.AcademicRecord = (0, mongoose_1.model)("AcademicRecord", AcademicRecordSchema);
