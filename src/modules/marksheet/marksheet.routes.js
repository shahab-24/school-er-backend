"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var marksheet_controller_1 = require("./marksheet.controller");
var router = (0, express_1.Router)();
router.get("/pdf/:studentId", marksheet_controller_1.MarksheetController.pdf);
exports.default = router;
