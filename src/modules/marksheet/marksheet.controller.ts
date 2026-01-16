import { Request, Response } from "express";
import { MarksheetService } from "./marksheet.service";

export const MarksheetController = {
  async pdf(req: Request, res: Response) {
    const { studentId } = req.params;
    const { scope, terminalKey, session, class: cls } = req.query as any;

    const pdfBuffer = await MarksheetService.generatePDF({
      studentId,
      scope,
      terminalKey,
      session,
      class: Number(cls),
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=marksheet-${studentId}.pdf`
    );
    res.send(pdfBuffer);
  },
};
