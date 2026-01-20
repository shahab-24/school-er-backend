// src/routes.ts - SIMPLE STATIC VERSION
import { Router } from "express";
import { AuthController } from "./modules/auth/auth.controller";

const router = Router();

// API info route
router.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "KHIRAM GOVERNMENT PRIMARY SCHOOL ERP API v1.0",
    endpoints: {
      "auth/login": "POST /api/v1/auth/login",
      health: "GET /health",
      api: "GET /api/v1",
    },
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    school: process.env.SCHOOL_NAME_EN,
  });
});

// ✅ DIRECT ROUTES - No dynamic imports needed
router.post("/auth/login", AuthController.login);

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
