import { Router } from "express";
import { ResultConfigController } from "./resultConfig.controller";

const router = Router();

router.post("/", ResultConfigController.create);
router.get("/active", ResultConfigController.active);
router.get("/", ResultConfigController.list);

export default router;
