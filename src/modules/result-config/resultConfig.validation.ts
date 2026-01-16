import { z } from "zod";

export const examSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  totalMarks: z.number().positive(),
  required: z.boolean().optional(),
});

export const normalizationSchema = z.object({
  examKey: z.string().min(1),
  from: z.number().positive(),
  to: z.number().positive(),
});

export const aggregationSchema = z.object({
  type: z.enum(["sum", "average", "weighted"]),
  examKeys: z.array(z.string()).optional(),
  weights: z.record(z.number()).optional(),
});

export const createResultConfigSchema = z.object({
  session: z.string().min(1),
  class: z.number().int().positive(),
  exams: z.array(examSchema).min(1),
  normalization: z.array(normalizationSchema).min(1),
  aggregation: aggregationSchema,
  passRules: z
    .object({
      passPercentage: z.number().min(0).max(100),
      failIfAnySubjectFail: z.boolean(),
    })
    .optional(),
  grading: z
    .object({
      type: z.enum(["percentage", "gpa"]),
      scale: z
        .array(
          z.object({
            min: z.number().min(0).max(100),
            label: z.string(),
            point: z.number().optional(),
          })
        )
        .optional(),
    })
    .optional(),
});
