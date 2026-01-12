import { z } from "zod";

export const createStudentSchema = z.object({
  nameEn: z.string().min(2),
  nameBn: z.string().min(2),
  nameChakma: z.string().optional(),

  fatherNameEn: z.string().min(2),
  fatherNameBn: z.string().min(2),

  motherNameEn: z.string().min(2),
  motherNameBn: z.string().min(2),

  gender: z.enum(["male", "female", "other"]),
  religion: z.string(),

  birthDate: z.string(), // ISO date

  studentBirthReg: z.string(),
  fatherBirthReg: z.string().optional(),
  motherBirthReg: z.string().optional(),

  fatherNID: z.string().optional(),
  motherNID: z.string().optional(),

  mobile: z.string().min(10),

  language: z.enum(["bn", "en", "chakma"]).optional(),
  imageUrl: z.string().url().optional(),
});
