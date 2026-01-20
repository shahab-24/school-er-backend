import { Router } from "express";
import { AcademicRecordController } from "./academicRecord.controller";
import { authenticate } from "../auth/auth.middleware";
import { requireRole } from "../auth/rbac.guard";

const router = Router();

// Teacher draft save
router.post(
  "/draft",
  authenticate,
  requireRole("TEACHER"),
  AcademicRecordController.saveDraft
);

// submit / unlock / publish
router.patch(
  "/status",
  authenticate,
  requireRole("TEACHER", "SCHOOL_ADMIN"),
  AcademicRecordController.changeStatus
);

// Admin view
router.get(
  "/class",
  authenticate,
  requireRole("SCHOOL_ADMIN"),
  AcademicRecordController.classList
);

export default router;
