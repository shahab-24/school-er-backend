"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarksheetService = void 0;
var resultSnapshot_model_1 = require("../result-snapshot/resultSnapshot.model");
var marksheet_html_1 = require("./templates/marksheet.html");
var qrcode_1 = require("qrcode");
var puppeteer_1 = require("puppeteer");
var typesafe_wrapper_1 = require("../../utils/typesafe-wrapper");
var schoolProfile = {
    nameEn: process.env.SCHOOL_NAME_EN || "School Name",
    nameBn: process.env.SCHOOL_NAME_BN,
    address: process.env.SCHOOL_ADDRESS,
    logoUrl: process.env.SCHOOL_LOGO_URL,
};
exports.MarksheetService = {
    generatePDF: function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var q, snap, qrPayload, qrBase64, html, browser, page, pdf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        q = {
                            studentId: query.studentId,
                            session: query.session,
                            class: query.class,
                            scope: query.scope,
                        };
                        if (query.scope === "terminal")
                            q.terminalKey = query.terminalKey;
                        return [4 /*yield*/, resultSnapshot_model_1.ResultSnapshot.findOne(q).lean()];
                    case 1:
                        snap = _a.sent();
                        if (!snap)
                            throw new Error("Result snapshot not found");
                        qrPayload = {
                            studentId: snap.studentId,
                            session: snap.session,
                            class: snap.class,
                            scope: snap.scope,
                            terminalKey: snap.terminalKey,
                        };
                        return [4 /*yield*/, qrcode_1.default.toDataURL(JSON.stringify(qrPayload))];
                    case 2:
                        qrBase64 = _a.sent();
                        html = (0, marksheet_html_1.renderMarksheetHTML)({
                            school: schoolProfile,
                            student: { studentId: snap.studentId },
                            meta: {
                                scope: snap.scope,
                                terminalLabel: (0, typesafe_wrapper_1.safeString)(snap.terminalKey),
                                session: snap.session,
                                class: snap.class,
                                position: snap.position,
                            },
                            subjects: snap.subjects.map(function (s) { return ({
                                subjectId: s.subjectId,
                                normalized: Object.fromEntries(s.normalized),
                                final: s.final,
                                failed: !!s.failed,
                            }); }),
                            summary: {
                                total: snap.total,
                                percentage: snap.percentage,
                                failed: !!snap.failed,
                            },
                            qrBase64: qrBase64,
                        });
                        return [4 /*yield*/, puppeteer_1.default.launch({
                                headless: process.env.NODE_ENV === "production" ? true : "new", // ADD CONDITION
                                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                            })];
                    case 3:
                        browser = _a.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 4:
                        page = _a.sent();
                        return [4 /*yield*/, page.setContent(html, { waitUntil: "networkidle0" })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, page.pdf({
                                format: "A4",
                                printBackground: true,
                                margin: {
                                    top: "20mm",
                                    bottom: "20mm",
                                    left: "15mm",
                                    right: "15mm",
                                },
                            })];
                    case 6:
                        pdf = _a.sent();
                        return [4 /*yield*/, browser.close()];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, pdf];
                }
            });
        });
    },
};
