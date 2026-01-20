import { Request, Response } from "express";
export declare const ResultSheetController: {
    classSheet(req: Request, res: Response): Promise<void>;
    annualWithPrevious(req: Request, res: Response): Promise<void>;
};
