import { AcademicRecord } from "./academicRecord.model";
import { publishAndGenerateResult } from "./academicRecord.publisher";

export const AcademicRecordService = {
  async upsertDraft(payload: any) {
    // only DRAFT editable
    const q = {
      studentId: payload.studentId,
      session: payload.session,
      class: payload.class,
      scope: payload.scope,
      terminalKey: payload.terminalKey,
    };

    const existing = await AcademicRecord.findOne(q);
    if (existing && existing.status !== "DRAFT") {
      throw new Error("Record is not editable");
    }

    return AcademicRecord.findOneAndUpdate(
      q,
      { $set: { marks: payload.marks } },
      { upsert: true, new: true }
    ).lean();
  },

  async submit(q: any) {
    return AcademicRecord.findOneAndUpdate(
      { ...q, status: "DRAFT" },
      { status: "SUBMITTED", submittedAt: new Date() },
      { new: true }
    ).lean();
  },

  async unlock(q: any) {
    return AcademicRecord.findOneAndUpdate(
      { ...q, status: "SUBMITTED" },
      { status: "DRAFT", submittedAt: undefined },
      { new: true }
    ).lean();
  },

  async publish(query: any, actor: any) {
    return publishAndGenerateResult(query, actor);
  },

  async listByClass(filter: any) {
    return AcademicRecord.find(filter).lean();
  },
};
