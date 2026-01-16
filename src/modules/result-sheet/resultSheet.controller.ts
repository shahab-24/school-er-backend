import { Request, Response } from "express";
import { ResultSheetService } from "./resultSheet.service";

export const ResultSheetController = {
  async classSheet(req: Request, res: Response) {
    const { scope, terminalKey, session, class: cls } = req.query as any;
    const sheet = await ResultSheetService.generate({
      scope,
      terminalKey,
      session,
      class: Number(cls),
    });
    res.json(sheet);
  },

  async annualWithPrevious(req: Request, res: Response) {
    const {
      session,
      class: cls,
      prevScope,
      prevTerminalKey,
      prevSession,
      prevClass,
    } = req.query as any;

    const sheet = await ResultSheetService.generateWithPrevious(
      { scope: "annual", session, class: Number(cls) },
      {
        scope: prevScope,
        terminalKey: prevTerminalKey,
        session: prevSession,
        class: Number(prevClass),
      }
    );
    res.json(sheet);
  },
};
