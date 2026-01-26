import { z } from "zod";

/**
 * 🌐 Localized text
 */
export const localizedString = z.record(z.string().min(1));

/**
 * 👨‍👩‍👦 Parent (Father / Mother)
 */
const parentSchema = z.object({
  name: localizedString,
  mobile: z.string().min(6),
  nid: z.string().min(5),
  birthRegistration: z.string().min(10),
});

/**
 * 👤 Guardian (optional)
 */
const guardianSchema = z.object({
  relation: z.enum(["guardian", "other"]),
  name: localizedString,
  mobile: z.string().min(6),
  nid: z.string().optional(),
  walletProvider: z.enum(["bKash", "Nagad", "Rocket", "Other"]),
});

/**
 * 🎓 Create Student
 */
export const createStudentSchema = z.object({
  studentUid: z.string().min(3),

  name: localizedString,

  gender: z.enum(["male", "female", "other"]),
  religion: z.string(),
  birthDate: z.string(), // ISO string, convert later
  birthRegistration: z.string(),

  languagePreference: z.enum(["bn", "en"]).optional(),

  father: parentSchema,
  mother: parentSchema,

  guardians: z.array(guardianSchema).optional(),

  imageUrl: z.string().url().optional(),

  current: z.object({
    session: z.string(),
    class: z.number().int().positive(),
    roll: z.number().int().positive(),
  }),
});

/**
 * 🔄 Update Status
 */
export const updateStatusSchema = z.object({
  status: z.enum(["active", "repeat", "passed", "transferred", "archived"]),
});

/**
 * 📈 Promotion
 */
export const promoteSchema = z.object({
  session: z.string(),
  fromClass: z.number().int().positive(),
  toClass: z.number().int().positive(),
  result: z.enum(["promoted", "repeat"]),
  previousRoll: z.number().int().optional(),
  newRoll: z.number().int().optional(),
});

/**
 * 💰 Stipend Beneficiary
 */
export const stipendBeneficiarySchema = z.object({
  name: z.string().min(2),
  mobile: z.string().min(6),
  relation: z.enum(["father", "mother", "guardian", "other"]),
  paymentMethod: z.enum(["mobile_banking", "bank", "cash"]),
  walletProvider: z.enum(["bKash", "Nagad", "Rocket", "Other"]),
});
