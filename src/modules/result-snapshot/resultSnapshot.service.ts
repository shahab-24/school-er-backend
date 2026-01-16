import { ResultSnapshot } from "./resultSnapshot.model";

export const ResultSnapshotService = {
  async publish(payload: any) {
    // enforce terminalKey when scope=terminal
    if (payload.scope === "terminal" && !payload.terminalKey) {
      throw new Error("terminalKey is required for terminal scope");
    }

    // bulk insert as transaction-like behavior
    const docs = payload.results.map((r: any) => ({
      scope: payload.scope,
      terminalKey:
        payload.scope === "terminal" ? payload.terminalKey : undefined,
      session: payload.session,
      class: payload.class,
      studentId: r.studentId,
      academicRecordId: r.academicRecordId,
      resultConfigId: payload.resultConfigId,
      subjects: r.subjects,
      total: r.total,
      percentage: r.percentage,
      failed: r.failed,
    }));

    return ResultSnapshot.insertMany(docs, { ordered: true });
  },

  async listByClass(params: {
    scope: "terminal" | "annual";
    terminalKey?: string;
    session: string;
    class: number;
  }) {
    const q: any = {
      scope: params.scope,
      session: params.session,
      class: params.class,
    };
    if (params.scope === "terminal") q.terminalKey = params.terminalKey;
    return ResultSnapshot.find(q).lean();
  },

  async getStudent(params: {
    studentId: string;
    scope: "terminal" | "annual";
    terminalKey?: string;
    session: string;
  }) {
    const q: any = {
      studentId: params.studentId,
      scope: params.scope,
      session: params.session,
    };
    if (params.scope === "terminal") q.terminalKey = params.terminalKey;
    return ResultSnapshot.findOne(q).lean();
  },
};
