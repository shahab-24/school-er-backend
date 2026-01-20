"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulkService = void 0;
const archiver_1 = __importDefault(require("archiver"));
const student_model_1 = require("../student/student.model");
const idCard_service_1 = require("../id-card/idCard.service");
const typesafe_wrapper_1 = require("../../utils/typesafe-wrapper");
exports.BulkService = {
    async generateClassIdCardsZip(params, res) {
        const students = await student_model_1.Student.find({
            "current.class": params.class,
            "current.session": params.session,
            status: { $ne: "archived" },
        }).lean();
        if (!students.length) {
            throw new Error("No students found");
        }
        const archive = (0, archiver_1.default)("zip", { zlib: { level: 9 } });
        archive.pipe(res);
        for (const student of students) {
            const { frontPdf, backPdf } = await idCard_service_1.IDCardService.generatePDF({
                studentUid: student.studentUid,
            });
            (0, typesafe_wrapper_1.safeArchiveAppend)(archive, frontPdf, {
                name: `${student.studentUid}-front.pdf`,
            });
            (0, typesafe_wrapper_1.safeArchiveAppend)(archive, backPdf, {
                name: `${student.studentUid}-back.pdf`,
            });
            // archive.append(frontPdf, {
            //   name: `${student.studentUid}-front.pdf`,
            // });
            // archive.append(backPdf, {
            //   name: `${student.studentUid}-back.pdf`,
            // });
        }
        await archive.finalize();
    },
};
//# sourceMappingURL=bulk.service.js.map