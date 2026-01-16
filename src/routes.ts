import { Router } from "express";
import studentRoutes from "./modules/student/student.routes";
import resultConfigRoutes from "./modules/result-config/resultConfig.routes";
import resultSnapshotRoutes from "./modules/result-snapshot/resultSnapshot.routes";
import resultSheetRoutes from "./modules/result-sheet/resultSheet.routes";
import marksheetRoutes from "./modules/marksheet/marksheet.routes";
import authRoutes from "./modules/auth/auth.routes";

const router = Router();


router.use("/students", studentRoutes);
router.use("/result-configs", resultConfigRoutes);
router.use("/result-snapshots", resultSnapshotRoutes);
router.use("/result-sheets", resultSheetRoutes);
router.use("/marksheets", marksheetRoutes);
router.use("/auth", authRoutes);





export default router;
