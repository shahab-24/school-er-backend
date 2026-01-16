import { Request, Response } from "express";
import { createResultConfigSchema } from "./resultConfig.validation";
import { ResultConfigService } from "./resultConfig.service";

export const ResultConfigController = {
  async create(req: Request, res: Response) {
    const parsed = createResultConfigSchema.parse(req.body);
    const cfg = await ResultConfigService.create(parsed);
    res.status(201).json(cfg);
  },

  async active(req: Request, res: Response) {
    const session = String(req.query.session);
    const cls = Number(req.query.class);
    const cfg = await ResultConfigService.getActive(session, cls);
    if (!cfg) return res.status(404).json({ message: "No active config" });
    res.json(cfg);
  },

  async list(req: Request, res: Response) {
    const session = req.query.session?.toString();
    const cls = req.query.class ? Number(req.query.class) : undefined;
    const list = await ResultConfigService.list(session, cls);
    res.json(list);
  },
};
