"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var academicRecord_controller_1 = require("./academicRecord.controller");
var auth_middleware_1 = require("../auth/auth.middleware");
var rbac_guard_1 = require("../auth/rbac.guard");
var router = (0, express_1.Router)();
// Teacher draft save
router.post("/draft", auth_middleware_1.authenticate, (0, rbac_guard_1.requireRole)("TEACHER"), academicRecord_controller_1.AcademicRecordController.saveDraft);
// submit / unlock / publish
router.patch("/status", auth_middleware_1.authenticate, (0, rbac_guard_1.requireRole)("TEACHER", "SCHOOL_ADMIN"), academicRecord_controller_1.AcademicRecordController.changeStatus);
// Admin view
router.get("/class", auth_middleware_1.authenticate, (0, rbac_guard_1.requireRole)("SCHOOL_ADMIN"), academicRecord_controller_1.AcademicRecordController.classList);
exports.default = router;
