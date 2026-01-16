import { Router } from "express";
import { MarksheetController } from "./marksheet.controller";

const router = Router();

router.get("/pdf/:studentId", MarksheetController.pdf);

export default router;
