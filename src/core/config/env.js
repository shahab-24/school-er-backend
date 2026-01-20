"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
var zod_1 = require("zod");
var envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.string(),
    PORT: zod_1.z.string(),
    MONGO_URI: zod_1.z.string().url(),
    JWT_SECRET: zod_1.z.string().min(10),
    SCHOOL_NAME_EN: zod_1.z.string(),
    SCHOOL_ADDRESS: zod_1.z.string(),
});
exports.env = envSchema.parse(process.env);
