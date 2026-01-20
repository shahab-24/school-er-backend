"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bulk_controller_1 = require("./bulk.controller");
var auth_middleware_1 = require("../auth/auth.middleware");
var rbac_guard_1 = require("../auth/rbac.guard");
var router = (0, express_1.Router)();
router.get("/class/:class/session/:session/id-cards", auth_middleware_1.authenticate, (0, rbac_guard_1.requireRole)("SUPER_ADMIN", "SCHOOL_ADMIN"), bulk_controller_1.BulkController.classIdCards);
exports.default = router;
