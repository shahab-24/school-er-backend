import { z } from "zod";

const localized = z.record(z.string().min(1));

export const createStudentSchema = z.object({
  studentUid: z.string().min(3),
  name: localized,
  gender: z.enum(["male", "female", "other"]).optional(),
  religion: z.string().optional(),
  birthDate: z.string().optional(),
  birthRegistration: z.string().optional(),
  languagePreference: z.string().optional(),
  guardians: z
    .array(
      z.object({
        relation: z.enum(["father", "mother", "guardian"]),
        name: localized,
        mobile: z.string().optional(),
        nid: z.string().optional(),
        birthRegistration: z.string().optional(),
      })
    )
    .optional(),
  imageUrl: z.string().url().optional(),
  current: z.object({
    session: z.string(),
    class: z.number().int().positive(),
    roll: z.number().int().positive().optional(),
  }),
});

export const updateStatusSchema = z.object({
  status: z.enum(["active", "repeat", "passed", "transferred", "archived"]),
});

export const promoteSchema = z.object({
  session: z.string(),
  fromClass: z.number().int().positive(),
  toClass: z.number().int().positive(),
  result: z.enum(["promoted", "repeat"]),
  previousRoll: z.number().int().optional(),
  newRoll: z.number().int().optional(),
});
