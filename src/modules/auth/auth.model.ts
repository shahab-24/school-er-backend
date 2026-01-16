import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, sparse: true },
    passwordHash: { type: String },

    role: {
      type: String,
      enum: ["SUPER_ADMIN", "SCHOOL_ADMIN", "TEACHER", "STUDENT", "VIEWER"],
      required: true,
      index: true,
    },

    studentUid: { type: String }, // if role = STUDENT
    teacherId: { type: String }, // future extension

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const User = model("User", UserSchema);
