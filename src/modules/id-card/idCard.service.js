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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDCardService = void 0;
var qrcode_1 = require("qrcode");
var puppeteer_1 = require("puppeteer");
var student_model_1 = require("../student/student.model");
var idCard_front_html_1 = require("./templates/idCard.front.html");
var idCard_back_html_1 = require("./templates/idCard.back.html");
var schoolProfile = {
    name: { en: (_a = process.env.SCHOOL_NAME_EN) !== null && _a !== void 0 ? _a : "School" },
    logoUrl: process.env.SCHOOL_LOGO_URL,
    address: process.env.SCHOOL_ADDRESS,
    contact: process.env.SCHOOL_PHONE,
};
exports.IDCardService = {
    generatePDF: function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var student, qrPayload, guardianMobile, normalizedImageUrl, qrBase64, data, browser, page, frontPdf, backPdf;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, student_model_1.Student.findOne({
                            studentUid: query.studentUid,
                        }).lean()];
                    case 1:
                        student = _c.sent();
                        if (!student)
                            throw new Error("Student not found");
                        qrPayload = {
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
                        guardianMobile = typeof ((_b = (_a = student.guardians) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.mobile) === "string"
                            ? student.guardians[0].mobile
                            : undefined;
                        normalizedImageUrl = typeof student.imageUrl === "string" ? student.imageUrl : undefined;
                        return [4 /*yield*/, qrcode_1.default.toDataURL(JSON.stringify(qrPayload))];
                    case 2:
                        qrBase64 = _c.sent();
                        data = {
                            school: schoolProfile,
                            student: {
                                studentUid: student.studentUid,
                                name: student.name,
                                imageUrl: normalizedImageUrl,
                                class: student.current.class,
                                roll: student.current.roll,
                                guardianMobile: guardianMobile,
                            },
                            meta: {
                                issueDate: new Date().toISOString().slice(0, 10),
                            },
                            qrBase64: qrBase64,
                        };
                        return [4 /*yield*/, puppeteer_1.default.launch({
                                headless: true,
                                args: ["--no-sandbox", "--disable-setuid-sandbox"],
                            })];
                    case 3:
                        browser = _c.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 4:
                        page = _c.sent();
                        // FRONT
                        return [4 /*yield*/, page.setContent((0, idCard_front_html_1.renderIDCardFront)(data))];
                    case 5:
                        // FRONT
                        _c.sent();
                        return [4 /*yield*/, page.pdf({ width: "320px", height: "200px" })];
                    case 6:
                        frontPdf = _c.sent();
                        // BACK
                        return [4 /*yield*/, page.setContent((0, idCard_back_html_1.renderIDCardBack)(data))];
                    case 7:
                        // BACK
                        _c.sent();
                        return [4 /*yield*/, page.pdf({ width: "320px", height: "200px" })];
                    case 8:
                        backPdf = _c.sent();
                        return [4 /*yield*/, browser.close()];
                    case 9:
                        _c.sent();
                        return [2 /*return*/, { frontPdf: frontPdf, backPdf: backPdf }];
                }
            });
        });
    },
};
