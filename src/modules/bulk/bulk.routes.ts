import { Router } from "express";
import { BulkController } from "./bulk.controller";
import { authenticate } from "../auth/auth.middleware";
import { requireRole } from "../auth/rbac.guard";

const router = Router();

router.get(
  "/class/:class/session/:session/id-cards",
  authenticate,
  requireRole("SUPER_ADMIN", "SCHOOL_ADMIN"),
  BulkController.classIdCards
);

export default router;
