"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultConfig = void 0;
var mongoose_1 = require("mongoose");
var ExamSchema = new mongoose_1.Schema({
    key: { type: String, required: true }, // e.g. written, ct, oral
    label: { type: String, required: true }, // UI label
    totalMarks: { type: Number, required: true },
    required: { type: Boolean, default: true },
}, { _id: false });
var NormalizationSchema = new mongoose_1.Schema({
    examKey: { type: String, required: true },
    from: { type: Number, required: true }, // e.g. 100
    to: { type: Number, required: true }, // e.g. 70
}, { _id: false });
var AggregationSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ["sum", "average", "weighted"],
        required: true,
    },
    examKeys: [{ type: String }], // for average
    weights: { type: Map, of: Number }, // for weighted
}, { _id: false });
var GradingSchema = new mongoose_1.Schema({
    type: { type: String, enum: ["percentage", "gpa"], default: "percentage" },
    scale: [
        {
            min: { type: Number, required: true },
            label: { type: String, required: true },
            point: { type: Number },
        },
    ],
}, { _id: false });
var ResultConfigSchema = new mongoose_1.Schema({
    session: { type: String, required: true, index: true },
    class: { type: Number, required: true, index: true },
    version: { type: Number, required: true }, // increment on change
    exams: { type: [ExamSchema], required: true },
    normalization: { type: [NormalizationSchema], required: true },
    aggregation: { type: AggregationSchema, required: true },
    passRules: {
        passPercentage: { type: Number, default: 33 },
        failIfAnySubjectFail: { type: Boolean, default: true },
    },
    grading: { type: GradingSchema },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
ResultConfigSchema.index({ session: 1, class: 1, version: 1 }, { unique: true });
exports.ResultConfig = (0, mongoose_1.model)("ResultConfig", ResultConfigSchema);
