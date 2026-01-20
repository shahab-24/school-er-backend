import { Router } from "express";
import { IDCardController } from "./idCard.controller";
import { authenticate } from "../auth/auth.middleware";
import { requireRole } from "../auth/rbac.guard";

const router = Router();

router.get(
  "/pdf/:studentUid",
  authenticate,
  requireRole("SUPER_ADMIN", "SCHOOL_ADMIN"),
  IDCardController.pdf
);

export default router;
