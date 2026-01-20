import { Request, Response } from "express";
export declare const ResultConfigController: {
    create(req: Request, res: Response): Promise<void>;
    active(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    list(req: Request, res: Response): Promise<void>;
};
