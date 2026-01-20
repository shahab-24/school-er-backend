"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatusSchema = exports.upsertRecordSchema = exports.marksSchema = void 0;
const zod_1 = require("zod");
exports.marksSchema = zod_1.z.record(zod_1.z.record(zod_1.z.number().min(0)));
exports.upsertRecordSchema = zod_1.z.object({
    studentId: zod_1.z.string().min(1),
    session: zod_1.z.string().min(1),
    class: zod_1.z.number().int().positive(),
    scope: zod_1.z.enum(["terminal", "annual"]),
    terminalKey: zod_1.z.string().optional(),
    marks: exports.marksSchema,
});
exports.changeStatusSchema = zod_1.z.object({
    action: zod_1.z.enum(["submit", "unlock", "publish"]),
});
//# sourceMappingURL=academicRecord.validation.js.map