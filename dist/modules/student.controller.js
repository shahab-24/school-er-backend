"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentController = void 0;
const student_service_1 = require("./student/student.service");
const student_validation_1 = require("./student/student.validation");
exports.StudentController = {
    async create(req, res) {
        const parsed = student_validation_1.createStudentSchema.parse(req.body);
        const student = await student_service_1.StudentService.create(parsed);
        res.status(201).json(student);
    },
    async list(req, res) {
        const students = await student_service_1.StudentService.list(req.query);
        res.json(students);
    },
    async get(req, res) {
        const student = await student_service_1.StudentService.getById(req.params.id);
        if (!student)
            return res.status(404).json({ message: "Not found" });
        res.json(student);
    },
};
