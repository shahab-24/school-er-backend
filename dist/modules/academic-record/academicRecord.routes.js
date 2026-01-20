"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const academicRecord_controller_1 = require("./academicRecord.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const rbac_guard_1 = require("../auth/rbac.guard");
const router = (0, express_1.Router)();
// Teacher draft save
router.post("/draft", auth_middleware_1.authenticate, (0, rbac_guard_1.requireRole)("TEACHER"), academicRecord_controller_1.AcademicRecordController.saveDraft);
// submit / unlock / publish
router.patch("/status", auth_middleware_1.authenticate, (0, rbac_guard_1.requireRole)("TEACHER", "SCHOOL_ADMIN"), academicRecord_controller_1.AcademicRecordController.changeStatus);
// Admin view
router.get("/class", auth_middleware_1.authenticate, (0, rbac_guard_1.requireRole)("SCHOOL_ADMIN"), academicRecord_controller_1.AcademicRecordController.classList);
exports.default = router;
//# sourceMappingURL=academicRecord.routes.js.map