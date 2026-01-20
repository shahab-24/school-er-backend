"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
// src/config/env.ts
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["development", "production", "test"]),
    PORT: zod_1.z.string(),
    MONGO_URI: zod_1.z.string().url(),
    JWT_SECRET: zod_1.z.string().min(10),
    JWT_EXPIRES_IN: zod_1.z.string().optional(), // ✅ missing ছিল
    SCHOOL_NAME_EN: zod_1.z.string(),
    SCHOOL_ADDRESS: zod_1.z.string(),
});
exports.env = envSchema.parse(process.env);
//# sourceMappingURL=env.js.map