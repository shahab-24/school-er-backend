import { Request, Response, NextFunction } from "express";
export declare function requestLogger(req: Request & {
    requestId?: string;
}, _res: Response, next: NextFunction): void;
