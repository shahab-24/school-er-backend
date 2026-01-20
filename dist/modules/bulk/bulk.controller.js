"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkController = void 0;
const bulk_service_1 = require("./bulk.service");
exports.BulkController = {
    async classIdCards(req, res) {
        const { class: cls, session } = req.params;
        res.setHeader("Content-Type", "application/zip");
        res.setHeader("Content-Disposition", `attachment; filename=class-${cls}-${session}-idcards.zip`);
        await bulk_service_1.BulkService.generateClassIdCardsZip({ class: Number(cls), session }, res);
    },
};
//# sourceMappingURL=bulk.controller.js.map