import { Request, Response } from "express";
import { publishSnapshotSchema } from "./resultSnapshot.validation";
import { ResultSnapshotService } from "./resultSnapshot.service";

export const ResultSnapshotController = {
  async publish(req: Request, res: Response) {
    const parsed = publishSnapshotSchema.parse(req.body);
    const created = await ResultSnapshotService.publish(parsed);
    res.status(201).json({ count: created.length });
  },

  async classList(req: Request, res: Response) {
    const { scope, terminalKey, session, class: cls } = req.query as any;
    const list = await ResultSnapshotService.listByClass({
      scope,
      terminalKey,
      session,
      class: Number(cls),
    });
    res.json(list);
  },

  async student(req: Request, res: Response) {
    const { studentId } = req.params;
    const { scope, terminalKey, session } = req.query as any;
    const doc = await ResultSnapshotService.getStudent({
      studentId,
      scope,
      terminalKey,
      session,
    });
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  },
};
