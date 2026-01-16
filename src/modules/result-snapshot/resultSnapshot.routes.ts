import { Router } from "express";
import { ResultSnapshotController } from "./resultSnapshot.controller";

const router = Router();

router.post("/publish", ResultSnapshotController.publish);
router.get("/class", ResultSnapshotController.classList);
router.get("/student/:studentId", ResultSnapshotController.student);

export default router;
