"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResultConfigSchema = exports.aggregationSchema = exports.normalizationSchema = exports.examSchema = void 0;
const zod_1 = require("zod");
exports.examSchema = zod_1.z.object({
    key: zod_1.z.string().min(1),
    label: zod_1.z.string().min(1),
    totalMarks: zod_1.z.number().positive(),
    required: zod_1.z.boolean().optional(),
});
exports.normalizationSchema = zod_1.z.object({
    examKey: zod_1.z.string().min(1),
    from: zod_1.z.number().positive(),
    to: zod_1.z.number().positive(),
});
exports.aggregationSchema = zod_1.z.object({
    type: zod_1.z.enum(["sum", "average", "weighted"]),
    examKeys: zod_1.z.array(zod_1.z.string()).optional(),
    weights: zod_1.z.record(zod_1.z.number()).optional(),
});
exports.createResultConfigSchema = zod_1.z.object({
    session: zod_1.z.string().min(1),
    class: zod_1.z.number().int().positive(),
    exams: zod_1.z.array(exports.examSchema).min(1),
    normalization: zod_1.z.array(exports.normalizationSchema).min(1),
    aggregation: exports.aggregationSchema,
    passRules: zod_1.z
        .object({
        passPercentage: zod_1.z.number().min(0).max(100),
        failIfAnySubjectFail: zod_1.z.boolean(),
    })
        .optional(),
    grading: zod_1.z
        .object({
        type: zod_1.z.enum(["percentage", "gpa"]),
        scale: zod_1.z
            .array(zod_1.z.object({
            min: zod_1.z.number().min(0).max(100),
            label: zod_1.z.string(),
            point: zod_1.z.number().optional(),
        }))
            .optional(),
    })
        .optional(),
});
//# sourceMappingURL=resultConfig.validation.js.map