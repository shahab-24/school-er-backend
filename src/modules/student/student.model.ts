import { Schema, model, Types } from "mongoose";

/**
 * Localized text (EN/BN/Other)
 */
const LocalizedSchema = new Schema({}, { strict: false, _id: false });

/**
 * Guardian
 */
const GuardianSchema = new Schema(
  {
    relation: {
      type: String,
      enum: ["father", "mother", "guardian"],
      required: true,
    },
    name: { type: LocalizedSchema, required: true },
    mobile: { type: String },
    nid: { type: String },
    birthRegistration: { type: String },
  },
  { _id: false }
);

/**
 * Promotion History
 */
const PromotionSchema = new Schema(
  {
    session: { type: String, required: true },
    fromClass: { type: Number, required: true },
    toClass: { type: Number, required: true },
    result: {
      type: String,
      enum: ["promoted", "repeat"],
      required: true,
    },
    previousRoll: Number,
    newRoll: Number,
    decidedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

/**
 * ✅ Stipend Beneficiary (embedded, single source of truth)
 */
const StipendBeneficiarySchema = new Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },

    relation: {
      type: String,
      enum: ["father", "mother", "guardian", "other"],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["mobile_banking", "bank", "cash"],
      required: true,
    },

    walletProvider: {
      type: String,
      enum: ["bKash", "Nagad", "Rocket", "Other"],
    },

    isActive: { type: Boolean, default: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

/**
 * Student
 */
const StudentSchema = new Schema(
  {
    studentUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: { type: LocalizedSchema, required: true },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    religion: { type: String },
    birthDate: { type: Date },
    birthRegistration: { type: String },

    languagePreference: { type: String, default: "en" },

    guardians: { type: [GuardianSchema], default: [] },

    /**
     * ✅ stipend / upobritti receiver
     */
    stipendBeneficiary: {
      type: StipendBeneficiarySchema,
      required: false,
    },

    imageUrl: { type: String },

    current: {
      session: { type: String, index: true },
      class: { type: Number, index: true },
      roll: { type: Number },
    },

    status: {
      type: String,
      enum: ["active", "repeat", "passed", "transferred", "archived"],
      default: "active",
      index: true,
    },

    promotions: { type: [PromotionSchema], default: [] },

    archivedAt: { type: Date },
  },
  { timestamps: true }
);

StudentSchema.index({ "current.session": 1, "current.class": 1 });

export const Student = model("Student", StudentSchema);
