"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes.ts
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const student_routes_1 = __importDefault(require("./modules/student/student.routes"));
// import AcademicRecord from "./modules/student/student.routes";
const academicRecord_routes_1 = __importDefault(require("./modules/academic-record/academicRecord.routes"));
const router = (0, express_1.Router)();
// API root info
router.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "KHIRAM GOVERNMENT PRIMARY SCHOOL ERP API",
        version: "1.0.0",
        endpoints: {
            auth: "/api/v1/auth",
            health: "/health",
        },
        timestamp: new Date().toISOString(),
    });
});
// ✅ ONLY module routers
router.use("/auth", auth_routes_1.default);
// (later)
router.use("/students", student_routes_1.default);
router.use("/academic-records", academicRecord_routes_1.default);
// Placeholder routes for other endpoints
router.get("/students", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Students endpoint",
        note: "Student management system",
        implementation: "Coming soon",
    });
});
router.get("/academic-records", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Academic records endpoint",
        note: "Academic record management",
    });
});
router.get("/marksheets", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Marksheets endpoint",
        note: "Marksheet generation system",
    });
});
router.get("/bulk", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Bulk operations endpoint",
        note: "Bulk data processing",
    });
});
exports.default = router;
//# sourceMappingURL=routes.js.map