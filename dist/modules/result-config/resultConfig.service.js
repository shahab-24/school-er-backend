"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultConfigService = void 0;
const resultConfig_model_1 = require("./resultConfig.model");
exports.ResultConfigService = {
    async create(payload) {
        // deactivate previous active config for same session+class
        await resultConfig_model_1.ResultConfig.updateMany({ session: payload.session, class: payload.class, isActive: true }, { $set: { isActive: false } });
        const last = await resultConfig_model_1.ResultConfig.findOne({
            session: payload.session,
            class: payload.class,
        })
            .sort({ version: -1 })
            .lean();
        const version = last ? last.version + 1 : 1;
        return resultConfig_model_1.ResultConfig.create({ ...payload, version, isActive: true });
    },
    async getActive(session, cls) {
        return resultConfig_model_1.ResultConfig.findOne({ session, class: cls, isActive: true }).lean();
    },
    async list(session, cls) {
        const q = {};
        if (session)
            q.session = session;
        if (cls)
            q.class = cls;
        return resultConfig_model_1.ResultConfig.find(q).sort({ createdAt: -1 }).lean();
    },
};
//# sourceMappingURL=resultConfig.service.js.map