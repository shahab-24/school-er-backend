"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resultSheet_controller_1 = require("./resultSheet.controller");
const router = (0, express_1.Router)();
// class-wise sheet (terminal/annual)
router.get("/class", resultSheet_controller_1.ResultSheetController.classSheet);
// annual with previous comparison
router.get("/annual-with-previous", resultSheet_controller_1.ResultSheetController.annualWithPrevious);
exports.default = router;
//# sourceMappingURL=resultSheet.routes.js.map