import { Request, Response } from "express";
import { IDCardService } from "./idCard.service";

export const IDCardController = {
  async pdf(req: Request, res: Response) {
    const { studentUid } = req.params;
    const { frontPdf, backPdf } = await IDCardService.generatePDF({
      studentUid,
    });

    // return front by default; frontend can call twice if needed
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename=idcard-${studentUid}-front.pdf`
    );
    res.send(frontPdf);
  },
};
