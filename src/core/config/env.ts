// src/config/env.ts
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string(),
  MONGO_URI: z.string().url(),
  JWT_SECRET: z.string().min(10),
  JWT_EXPIRES_IN: z.string().optional(), // ✅ missing ছিল
  SCHOOL_NAME_EN: z.string(),
  SCHOOL_ADDRESS: z.string(),
});

export const env = envSchema.parse(process.env);
