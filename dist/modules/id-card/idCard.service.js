"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDCardService = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const student_model_1 = require("../student/student.model");
const idCard_front_html_1 = require("./templates/idCard.front.html");
const idCard_back_html_1 = require("./templates/idCard.back.html");
const schoolProfile = {
    name: { en: process.env.SCHOOL_NAME_EN ?? "School" },
    logoUrl: process.env.SCHOOL_LOGO_URL,
    address: process.env.SCHOOL_ADDRESS,
    contact: process.env.SCHOOL_PHONE,
};
exports.IDCardService = {
    async generatePDF(query) {
        const student = await student_model_1.Student.findOne({
            studentUid: query.studentUid,
        }).lean();
        if (!student)
            throw new Error("Student not found");
        const qrPayload = {
            studentUid: student.studentUid,
            type: "ID_CARD",
            imageUrl: student.imageUrl || undefined,
        };
        if (!student.current) {
            throw new Error("Student academic info missing");
        }
        if (student.current.class === null || student.current.class === undefined) {
            throw new Error("Student class is missing");
        }
        if (student.current.roll === null || student.current.roll === undefined) {
            throw new Error("Student roll is missing");
        }
        if (student.current.roll === null || student.current.roll === undefined) {
            throw new Error("Student roll is missing");
        }
        const guardianMobile = typeof student.guardians?.[0]?.mobile === "string"
            ? student.guardians[0].mobile
            : undefined;
        const normalizedImageUrl = typeof student.imageUrl === "string" ? student.imageUrl : undefined;
        const qrBase64 = await qrcode_1.default.toDataURL(JSON.stringify(qrPayload));
        const data = {
            school: schoolProfile,
            student: {
                studentUid: student.studentUid,
                name: student.name,
                imageUrl: normalizedImageUrl,
                class: student.current.class,
                roll: student.current.roll,
                guardianMobile,
            },
            meta: {
                issueDate: new Date().toISOString().slice(0, 10),
            },
            qrBase64,
        };
        const browser = await puppeteer_1.default.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();
        // FRONT
        await page.setContent((0, idCard_front_html_1.renderIDCardFront)(data));
        const frontPdf = await page.pdf({ width: "320px", height: "200px" });
        // BACK
        await page.setContent((0, idCard_back_html_1.renderIDCardBack)(data));
        const backPdf = await page.pdf({ width: "320px", height: "200px" });
        await browser.close();
        return { frontPdf, backPdf };
    },
};
//# sourceMappingURL=idCard.service.js.map