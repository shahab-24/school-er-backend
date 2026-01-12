import { Router } from "express";
import { StudentController } from "./student.controller";

const router = Router();

router.post("/", StudentController.create);
router.get("/", StudentController.list);
router.get("/:id", StudentController.get);

export default router;
