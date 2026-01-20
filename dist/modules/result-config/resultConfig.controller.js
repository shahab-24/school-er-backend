"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultConfigController = void 0;
const resultConfig_validation_1 = require("./resultConfig.validation");
const resultConfig_service_1 = require("./resultConfig.service");
exports.ResultConfigController = {
    async create(req, res) {
        const parsed = resultConfig_validation_1.createResultConfigSchema.parse(req.body);
        const cfg = await resultConfig_service_1.ResultConfigService.create(parsed);
        res.status(201).json(cfg);
    },
    async active(req, res) {
        const session = String(req.query.session);
        const cls = Number(req.query.class);
        const cfg = await resultConfig_service_1.ResultConfigService.getActive(session, cls);
        if (!cfg)
            return res.status(404).json({ message: "No active config" });
        res.json(cfg);
    },
    async list(req, res) {
        const session = req.query.session?.toString();
        const cls = req.query.class ? Number(req.query.class) : undefined;
        const list = await resultConfig_service_1.ResultConfigService.list(session, cls);
        res.json(list);
    },
};
//# sourceMappingURL=resultConfig.controller.js.map