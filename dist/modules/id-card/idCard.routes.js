"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const idCard_controller_1 = require("./idCard.controller");
const auth_middleware_1 = require("../auth/auth.middleware");
const rbac_guard_1 = require("../auth/rbac.guard");
const router = (0, express_1.Router)();
router.get("/pdf/:studentUid", auth_middleware_1.authenticate, (0, rbac_guard_1.requireRole)("SUPER_ADMIN", "SCHOOL_ADMIN"), idCard_controller_1.IDCardController.pdf);
exports.default = router;
//# sourceMappingURL=idCard.routes.js.map