import { Request, Response } from "express";
export declare const AcademicRecordController: {
    saveDraft(req: Request, res: Response): Promise<void>;
    changeStatus(req: Request & {
        user?: any;
    }, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    classList(req: Request, res: Response): Promise<void>;
};
