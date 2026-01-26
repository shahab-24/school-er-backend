// src/routes.ts
import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes";
import studentRoutes from "./modules/student/student.routes";
// import AcademicRecord from "./modules/student/student.routes";
import academicRecordRoutes from "./modules/academic-record/academicRecord.routes";

const router = Router();

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
router.use("/auth", authRoutes);


// (later)
router.use("/students", studentRoutes);
router.use("/academic-records", academicRecordRoutes);



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

export default router;
