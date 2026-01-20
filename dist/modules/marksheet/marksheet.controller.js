"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarksheetController = void 0;
const marksheet_service_1 = require("./marksheet.service");
exports.MarksheetController = {
    async pdf(req, res) {
        const { studentId } = req.params;
        const { scope, terminalKey, session, class: cls } = req.query;
        const pdfBuffer = await marksheet_service_1.MarksheetService.generatePDF({
            studentId,
            scope,
            terminalKey,
            session,
            class: Number(cls),
        });
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `inline; filename=marksheet-${studentId}.pdf`);
        res.send(pdfBuffer);
    },
};
//# sourceMappingURL=marksheet.controller.js.map