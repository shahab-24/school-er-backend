import { Request, Response } from "express";
import { BulkService } from "./bulk.service";

export const BulkController = {
  async classIdCards(req: Request, res: Response) {
    const { class: cls, session } = req.params;

    res.setHeader("Content-Type", "application/zip");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=class-${cls}-${session}-idcards.zip`
    );

    await BulkService.generateClassIdCardsZip(
      { class: Number(cls), session },
      res
    );
  },
};
