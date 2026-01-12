"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentSchema = void 0;
const zod_1 = require("zod");
exports.createStudentSchema = zod_1.z.object({
    nameEn: zod_1.z.string().min(2),
    nameBn: zod_1.z.string().min(2),
    nameChakma: zod_1.z.string().optional(),
    fatherNameEn: zod_1.z.string().min(2),
    fatherNameBn: zod_1.z.string().min(2),
    motherNameEn: zod_1.z.string().min(2),
    motherNameBn: zod_1.z.string().min(2),
    gender: zod_1.z.enum(["male", "female", "other"]),
    religion: zod_1.z.string(),
    birthDate: zod_1.z.string(), // ISO date
    studentBirthReg: zod_1.z.string(),
    fatherBirthReg: zod_1.z.string().optional(),
    motherBirthReg: zod_1.z.string().optional(),
    fatherNID: zod_1.z.string().optional(),
    motherNID: zod_1.z.string().optional(),
    mobile: zod_1.z.string().min(10),
    language: zod_1.z.enum(["bn", "en", "chakma"]).optional(),
    imageUrl: zod_1.z.string().url().optional(),
});
