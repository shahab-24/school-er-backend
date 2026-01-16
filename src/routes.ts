import { Router } from "express";
import studentRoutes from "./modules/student/student.routes";
import resultConfigRoutes from "./modules/result-config/resultConfig.routes";
import resultSnapshotRoutes from "./modules/result-snapshot/resultSnapshot.routes";
import resultSheetRoutes from "./modules/result-sheet/resultSheet.routes";

const router = Router();


router.use("/students", studentRoutes);
router.use("/result-configs", resultConfigRoutes);
router.use("/result-snapshots", resultSnapshotRoutes);
router.use("/result-sheets", resultSheetRoutes);



export default router;
