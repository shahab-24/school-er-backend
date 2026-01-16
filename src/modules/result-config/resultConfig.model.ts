import { Schema, model } from "mongoose";

const ExamSchema = new Schema(
  {
    key: { type: String, required: true }, // e.g. written, ct, oral
    label: { type: String, required: true }, // UI label
    totalMarks: { type: Number, required: true },
    required: { type: Boolean, default: true },
  },
  { _id: false }
);

const NormalizationSchema = new Schema(
  {
    examKey: { type: String, required: true },
    from: { type: Number, required: true }, // e.g. 100
    to: { type: Number, required: true }, // e.g. 70
  },
  { _id: false }
);

const AggregationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["sum", "average", "weighted"],
      required: true,
    },
    examKeys: [{ type: String }], // for average
    weights: { type: Map, of: Number }, // for weighted
  },
  { _id: false }
);

const GradingSchema = new Schema(
  {
    type: { type: String, enum: ["percentage", "gpa"], default: "percentage" },
    scale: [
      {
        min: { type: Number, required: true },
        label: { type: String, required: true },
        point: { type: Number },
      },
    ],
  },
  { _id: false }
);

const ResultConfigSchema = new Schema(
  {
    session: { type: String, required: true, index: true },
    class: { type: Number, required: true, index: true },
    version: { type: Number, required: true }, // increment on change

    exams: { type: [ExamSchema], required: true },
    normalization: { type: [NormalizationSchema], required: true },
    aggregation: { type: AggregationSchema, required: true },

    passRules: {
      passPercentage: { type: Number, default: 33 },
      failIfAnySubjectFail: { type: Boolean, default: true },
    },

    grading: { type: GradingSchema },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ResultConfigSchema.index(
  { session: 1, class: 1, version: 1 },
  { unique: true }
);

export const ResultConfig = model("ResultConfig", ResultConfigSchema);
