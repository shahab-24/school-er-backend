"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultSnapshotController = void 0;
const resultSnapshot_validation_1 = require("./resultSnapshot.validation");
const resultSnapshot_service_1 = require("./resultSnapshot.service");
exports.ResultSnapshotController = {
    async publish(req, res) {
        const parsed = resultSnapshot_validation_1.publishSnapshotSchema.parse(req.body);
        const created = await resultSnapshot_service_1.ResultSnapshotService.publish(parsed);
        res.status(201).json({ count: created.length });
    },
    async classList(req, res) {
        const { scope, terminalKey, session, class: cls } = req.query;
        const list = await resultSnapshot_service_1.ResultSnapshotService.listByClass({
            scope,
            terminalKey,
            session,
            class: Number(cls),
        });
        res.json(list);
    },
    async student(req, res) {
        const { studentId } = req.params;
        const { scope, terminalKey, session } = req.query;
        const doc = await resultSnapshot_service_1.ResultSnapshotService.getStudent({
            studentId,
            scope,
            terminalKey,
            session,
        });
        if (!doc)
            return res.status(404).json({ message: "Not found" });
        res.json(doc);
    },
};
//# sourceMappingURL=resultSnapshot.controller.js.map