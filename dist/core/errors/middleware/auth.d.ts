import { Request, Response, NextFunction } from "express";
export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}
export declare const auth: () => (req: AuthRequest, _res: Response, next: NextFunction) => void;
