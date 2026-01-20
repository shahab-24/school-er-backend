import { z } from "zod";

export const marksSchema = z.record(z.record(z.number().min(0)));

export const upsertRecordSchema = z.object({
  studentId: z.string().min(1),
  session: z.string().min(1),
  class: z.number().int().positive(),
  scope: z.enum(["terminal", "annual"]),
  terminalKey: z.string().optional(),
  marks: marksSchema,
});

export const changeStatusSchema = z.object({
  action: z.enum(["submit", "unlock", "publish"]),
});
