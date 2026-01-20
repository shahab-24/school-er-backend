"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var idCard_controller_1 = require("./idCard.controller");
var auth_middleware_1 = require("../auth/auth.middleware");
var rbac_guard_1 = require("../auth/rbac.guard");
var router = (0, express_1.Router)();
router.get("/pdf/:studentUid", auth_middleware_1.authenticate, (0, rbac_guard_1.requireRole)("SUPER_ADMIN", "SCHOOL_ADMIN"), idCard_controller_1.IDCardController.pdf);
exports.default = router;
