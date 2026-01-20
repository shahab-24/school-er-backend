"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var resultConfig_controller_1 = require("./resultConfig.controller");
var router = (0, express_1.Router)();
router.post("/", resultConfig_controller_1.ResultConfigController.create);
router.get("/active", resultConfig_controller_1.ResultConfigController.active);
router.get("/", resultConfig_controller_1.ResultConfigController.list);
exports.default = router;
