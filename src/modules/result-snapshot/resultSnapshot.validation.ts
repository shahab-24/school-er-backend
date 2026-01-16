import { z } from "zod";

export const publishSnapshotSchema = z.object({
  scope: z.enum(["terminal", "annual"]),
  terminalKey: z.string().optional(), // required if scope=terminal
  session: z.string().min(1),
  class: z.number().int().positive(),

  resultConfigId: z.string().min(1),
  // array of engine outputs
  results: z.array(
    z.object({
      studentId: z.string().min(1),
      academicRecordId: z.string().min(1),
      subjects: z.array(
        z.object({
          subjectId: z.string().min(1),
          normalized: z.record(z.number()),
          final: z.number(),
          failed: z.boolean().optional(),
        })
      ),
      total: z.number(),
      percentage: z.number(),
      failed: z.boolean(),
    })
  ),
});
