import { Router } from "express";
import studentRoutes from "./modules/student/student.routes";
import resultConfigRoutes from "./modules/result-config/resultConfig.routes";

const router = Router();

router.use("/students", studentRoutes);
router.use("/result-configs", resultConfigRoutes);

export default router;
