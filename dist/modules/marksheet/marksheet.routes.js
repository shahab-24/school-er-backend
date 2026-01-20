"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marksheet_controller_1 = require("./marksheet.controller");
const router = (0, express_1.Router)();
router.get("/pdf/:studentId", marksheet_controller_1.MarksheetController.pdf);
exports.default = router;
//# sourceMappingURL=marksheet.routes.js.map