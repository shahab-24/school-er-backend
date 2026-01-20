"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultSheetController = void 0;
const resultSheet_service_1 = require("./resultSheet.service");
exports.ResultSheetController = {
    async classSheet(req, res) {
        const { scope, terminalKey, session, class: cls } = req.query;
        const sheet = await resultSheet_service_1.ResultSheetService.generate({
            scope,
            terminalKey,
            session,
            class: Number(cls),
        });
        res.json(sheet);
    },
    async annualWithPrevious(req, res) {
        const { session, class: cls, prevScope, prevTerminalKey, prevSession, prevClass, } = req.query;
        const sheet = await resultSheet_service_1.ResultSheetService.generateWithPrevious({ scope: "annual", session, class: Number(cls) }, {
            scope: prevScope,
            terminalKey: prevTerminalKey,
            session: prevSession,
            class: Number(prevClass),
        });
        res.json(sheet);
    },
};
//# sourceMappingURL=resultSheet.controller.js.map