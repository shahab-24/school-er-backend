import { Schema, model } from "mongoose";

const StudentSchema = new Schema(
  {
    studentId: { type: String, required: true, unique: true, index: true },

    nameEn: { type: String, required: true, trim: true },
    nameBn: { type: String, required: true, trim: true },
    nameChakma: { type: String, trim: true },

    fatherNameEn: { type: String, required: true, trim: true },
    fatherNameBn: { type: String, required: true, trim: true },

    motherNameEn: { type: String, required: true, trim: true },
    motherNameBn: { type: String, required: true, trim: true },

    gender: { type: String, enum: ["male", "female", "other"], required: true },
    religion: { type: String, required: true },

    birthDate: { type: Date, required: true },

    studentBirthReg: { type: String, required: true, index: true },
    fatherBirthReg: { type: String },
    motherBirthReg: { type: String },

    fatherNID: { type: String },
    motherNID: { type: String },

    mobile: { type: String, required: true, index: true },

    language: { type: String, enum: ["bn", "en", "chakma"], default: "bn" },

    imageUrl: { type: String },
  },
  { timestamps: true }
);

// Text index for fast search
StudentSchema.index({
  nameEn: "text",
  nameBn: "text",
  studentId: "text",
  mobile: "text",
});

export const Student = model("Student", StudentSchema);
