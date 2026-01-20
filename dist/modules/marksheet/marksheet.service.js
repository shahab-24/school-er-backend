"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarksheetService = void 0;
const resultSnapshot_model_1 = require("../result-snapshot/resultSnapshot.model");
const marksheet_html_1 = require("./templates/marksheet.html");
const qrcode_1 = __importDefault(require("qrcode"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const typesafe_wrapper_1 = require("../../utils/typesafe-wrapper");
const schoolProfile = {
    nameEn: process.env.SCHOOL_NAME_EN || "School Name",
    nameBn: process.env.SCHOOL_NAME_BN,
    address: process.env.SCHOOL_ADDRESS,
    logoUrl: process.env.SCHOOL_LOGO_URL,
};
exports.MarksheetService = {
    async generatePDF(query) {
        const q = {
            studentId: query.studentId,
            session: query.session,
            class: query.class,
            scope: query.scope,
        };
        if (query.scope === "terminal")
            q.terminalKey = query.terminalKey;
        const snap = await resultSnapshot_model_1.ResultSnapshot.findOne(q).lean();
        if (!snap)
            throw new Error("Result snapshot not found");
        // QR payload
        const qrPayload = {
            studentId: snap.studentId,
            session: snap.session,
            class: snap.class,
            scope: snap.scope,
            terminalKey: snap.terminalKey,
        };
        const qrBase64 = await qrcode_1.default.toDataURL(JSON.stringify(qrPayload));
        const html = (0, marksheet_html_1.renderMarksheetHTML)({
            school: schoolProfile,
            student: { studentId: snap.studentId },
            meta: {
                scope: snap.scope,
                terminalLabel: (0, typesafe_wrapper_1.safeString)(snap.terminalKey),
                session: snap.session,
                class: snap.class,
                position: (0, typesafe_wrapper_1.safeNumber)(snap.position),
            },
            subjects: snap.subjects.map((s) => ({
                subjectId: s.subjectId,
                normalized: Object.fromEntries(s.normalized),
                final: s.final,
                failed: !!s.failed,
            })),
            summary: {
                total: snap.total,
                percentage: snap.percentage,
                failed: !!snap.failed,
            },
            qrBase64,
        });
        // Puppeteer PDF - FIXED: Type assertion for headless
        const browser = await puppeteer_1.default.launch({
            headless: (process.env.NODE_ENV === "production" ? true : "new"),
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });
        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: {
                top: "20mm",
                bottom: "20mm",
                left: "15mm",
                right: "15mm",
            },
        });
        await browser.close();
        return pdf;
    },
};
//# sourceMappingURL=marksheet.service.js.map