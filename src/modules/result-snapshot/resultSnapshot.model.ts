import { Schema, model } from "mongoose";

const SubjectSnapshotSchema = new Schema(
  {
    subjectId: { type: String, required: true },
    normalized: { type: Map, of: Number, required: true }, // examKey -> normalized mark
    final: { type: Number, required: true },
    failed: { type: Boolean, default: false },
  },
  { _id: false }
);

const ResultSnapshotSchema = new Schema(
  {
    // scope
    scope: { type: String, enum: ["terminal", "annual"], required: true },
    terminalKey: { type: String }, // e.g. first_terminal (only for terminal)

    // identity
    session: { type: String, required: true, index: true },
    class: { type: Number, required: true, index: true },
    studentId: { type: String, required: true, index: true },

    // references (for traceability)
    resultConfigId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    academicRecordId: { type: Schema.Types.ObjectId, required: true },

    // result data
    subjects: { type: [SubjectSnapshotSchema], required: true },
    total: { type: Number, required: true },
    percentage: { type: Number, required: true },
    failed: { type: Boolean, default: false },

    // placement (filled later)
    position: { type: Number },

    // lock
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// one snapshot per student per scope+terminal+session+class
ResultSnapshotSchema.index(
  { scope: 1, terminalKey: 1, session: 1, class: 1, studentId: 1 },
  { unique: true }
);

export const ResultSnapshot = model("ResultSnapshot", ResultSnapshotSchema);
