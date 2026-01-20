import { Request, Response } from "express";
export declare const ResultSnapshotController: {
    publish(req: Request, res: Response): Promise<void>;
    classList(req: Request, res: Response): Promise<void>;
    student(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
};
