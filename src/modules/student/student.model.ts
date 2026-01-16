import { Schema, model } from "mongoose";

const LocalizedSchema = new Schema({}, { strict: false, _id: false });

const GuardianSchema = new Schema(
  {
    relation: {
      type: String,
      enum: ["father", "mother", "guardian"],
      required: true,
    },
    name: { type: LocalizedSchema, required: true },
    mobile: String,
    nid: String,
    birthRegistration: String,
  },
  { _id: false }
);

const PromotionSchema = new Schema(
  {
    session: { type: String, required: true },
    fromClass: { type: Number, required: true },
    toClass: { type: Number, required: true },
    result: { type: String, enum: ["promoted", "repeat"], required: true },
    previousRoll: Number,
    newRoll: Number,
    decidedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const StudentSchema = new Schema(
  {
    studentUid: { type: String, required: true, unique: true, index: true },

    name: { type: LocalizedSchema, required: true },
    gender: { type: String, enum: ["male", "female", "other"] },
    religion: { type: String },
    birthDate: { type: Date },

    birthRegistration: String,
    languagePreference: { type: String, default: "en" },

    guardians: { type: [GuardianSchema], default: [] },

    imageUrl: String,

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

    archivedAt: Date,
  },
  { timestamps: true }
);

StudentSchema.index({ "current.session": 1, "current.class": 1 });
export const Student = model("Student", StudentSchema);
