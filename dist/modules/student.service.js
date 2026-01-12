"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const student_model_1 = require("./student.model");
const generateStudentId = async () => {
    const count = await student_model_1.Student.countDocuments();
    return `STD-${(count + 1).toString().padStart(6, "0")}`;
};
exports.StudentService = {
    async create(payload) {
        const studentId = await generateStudentId();
        return student_model_1.Student.create({ ...payload, studentId });
    },
    async list(query) {
        const { search } = query;
        if (search) {
            return student_model_1.Student.find({ $text: { $search: search } }).lean();
        }
        return student_model_1.Student.find().lean();
    },
    async getById(id) {
        return student_model_1.Student.findById(id).lean();
    },
};
