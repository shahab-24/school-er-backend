"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promoteSchema = exports.updateStatusSchema = exports.createStudentSchema = void 0;
const zod_1 = require("zod");
const localized = zod_1.z.record(zod_1.z.string().min(1));
exports.createStudentSchema = zod_1.z.object({
    studentUid: zod_1.z.string().min(3),
    name: localized,
    gender: zod_1.z.enum(["male", "female", "other"]).optional(),
    religion: zod_1.z.string().optional(),
    birthDate: zod_1.z.string().optional(),
    birthRegistration: zod_1.z.string().optional(),
    languagePreference: zod_1.z.string().optional(),
    guardians: zod_1.z
        .array(zod_1.z.object({
        relation: zod_1.z.enum(["father", "mother", "guardian"]),
        name: localized,
        mobile: zod_1.z.string().optional(),
        nid: zod_1.z.string().optional(),
        birthRegistration: zod_1.z.string().optional(),
    }))
        .optional(),
    imageUrl: zod_1.z.string().url().optional(),
    current: zod_1.z.object({
        session: zod_1.z.string(),
        class: zod_1.z.number().int().positive(),
        roll: zod_1.z.number().int().positive().optional(),
    }),
});
exports.updateStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(["active", "repeat", "passed", "transferred", "archived"]),
});
exports.promoteSchema = zod_1.z.object({
    session: zod_1.z.string(),
    fromClass: zod_1.z.number().int().positive(),
    toClass: zod_1.z.number().int().positive(),
    result: zod_1.z.enum(["promoted", "repeat"]),
    previousRoll: zod_1.z.number().int().optional(),
    newRoll: zod_1.z.number().int().optional(),
});
//# sourceMappingURL=student.validation.js.map