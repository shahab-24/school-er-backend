"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resultSnapshot_controller_1 = require("./resultSnapshot.controller");
const router = (0, express_1.Router)();
router.post("/publish", resultSnapshot_controller_1.ResultSnapshotController.publish);
router.get("/class", resultSnapshot_controller_1.ResultSnapshotController.classList);
router.get("/student/:studentId", resultSnapshot_controller_1.ResultSnapshotController.student);
exports.default = router;
//# sourceMappingURL=resultSnapshot.routes.js.map