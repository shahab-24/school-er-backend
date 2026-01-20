"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var resultSheet_controller_1 = require("./resultSheet.controller");
var router = (0, express_1.Router)();
// class-wise sheet (terminal/annual)
router.get("/class", resultSheet_controller_1.ResultSheetController.classSheet);
// annual with previous comparison
router.get("/annual-with-previous", resultSheet_controller_1.ResultSheetController.annualWithPrevious);
exports.default = router;
