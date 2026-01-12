"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = require("./student/student.controller");
const router = (0, express_1.Router)();
router.post("/", student_controller_1.StudentController.create);
router.get("/", student_controller_1.StudentController.list);
router.get("/:id", student_controller_1.StudentController.get);
exports.default = router;
