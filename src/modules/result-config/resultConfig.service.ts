import { ResultConfig } from "./resultConfig.model";

export const ResultConfigService = {
  async create(payload: any) {
    // deactivate previous active config for same session+class
    await ResultConfig.updateMany(
      { session: payload.session, class: payload.class, isActive: true },
      { $set: { isActive: false } }
    );

    const last = await ResultConfig.findOne({
      session: payload.session,
      class: payload.class,
    })
      .sort({ version: -1 })
      .lean();

    const version = last ? last.version + 1 : 1;

    return ResultConfig.create({ ...payload, version, isActive: true });
  },

  async getActive(session: string, cls: number) {
    return ResultConfig.findOne({ session, class: cls, isActive: true }).lean();
  },

  async list(session?: string, cls?: number) {
    const q: any = {};
    if (session) q.session = session;
    if (cls) q.class = cls;
    return ResultConfig.find(q).sort({ createdAt: -1 }).lean();
  },
};
