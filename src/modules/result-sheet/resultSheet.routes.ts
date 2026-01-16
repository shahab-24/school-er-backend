import { Router } from "express";
import { ResultSheetController } from "./resultSheet.controller";

const router = Router();

// class-wise sheet (terminal/annual)
router.get("/class", ResultSheetController.classSheet);

// annual with previous comparison
router.get("/annual-with-previous", ResultSheetController.annualWithPrevious);

export default router;
