"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDCardController = void 0;
const idCard_service_1 = require("./idCard.service");
exports.IDCardController = {
    async pdf(req, res) {
        const { studentUid } = req.params;
        const { frontPdf, backPdf } = await idCard_service_1.IDCardService.generatePDF({
            studentUid,
        });
        // return front by default; frontend can call twice if needed
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `inline; filename=idcard-${studentUid}-front.pdf`);
        res.send(frontPdf);
    },
};
//# sourceMappingURL=idCard.controller.js.map