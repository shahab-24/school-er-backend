import { Router } from "express";
import { StudentController } from "./student.controller";

const router = Router();

router.post("/", StudentController.create);
router.get("/", StudentController.list);
router.get("/:studentUid", StudentController.get);
router.patch("/:studentUid/status", StudentController.updateStatus);
router.post("/:studentUid/promote", StudentController.promote);

export default router;
