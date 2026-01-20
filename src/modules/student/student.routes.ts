import { Router } from "express";


import { auth } from "../../core/errors/middleware/auth";
import { requireRole } from "../../core/errors/middleware/requireRole";
import { StudentController } from "./student.controller";

const router = Router();

router.post("/", StudentController.create);
router.get("/", StudentController.list);
router.get("/:studentUid", StudentController.get);
router.patch("/:studentUid/status", StudentController.updateStatus);
router.post("/:studentUid/promote", StudentController.promote);




router.post("/", auth(), requireRole("SCHOOL_ADMIN"), StudentController.create);

router.get(
  "/",
  auth(),
  requireRole("SCHOOL_ADMIN", "TEACHER"),
  StudentController.list
);

router.get(
  "/:studentUid",
  auth(),
  requireRole("SCHOOL_ADMIN", "TEACHER"),
  StudentController.get
);

router.patch(
  "/:studentUid/status",
  auth(),
  requireRole("SCHOOL_ADMIN"),
  StudentController.updateStatus
);

router.post(
  "/:studentUid/promote",
  auth(),
  requireRole("SCHOOL_ADMIN"),
  StudentController.promote
);

router.patch(
  "/:studentUid/stipend-beneficiary",
  auth(),
  requireRole("SCHOOL_ADMIN"),
  StudentController.updateStipendBeneficiary
);

router.get(
  "/:studentUid/stipend-beneficiary",
  auth(),
  requireRole("SCHOOL_ADMIN", "TEACHER"),
  StudentController.getStipendBeneficiary
);





export default router;
