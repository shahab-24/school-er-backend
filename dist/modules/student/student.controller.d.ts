import { Request, Response } from "express";
export declare const StudentController: {
    create(req: Request, res: Response): Promise<void>;
    list(req: Request, res: Response): Promise<void>;
    get(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    updateStatus(req: Request, res: Response): Promise<void>;
    promote(req: Request, res: Response): Promise<void>;
    updateStipendBeneficiary(req: Request, res: Response): Promise<void>;
    getStipendBeneficiary(req: Request, res: Response): Promise<void>;
};
