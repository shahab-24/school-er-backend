import { Request, Response } from "express";
export declare const AuthController: {
    login(req: Request, res: Response): Promise<void>;
    me(req: Request, res: Response): Promise<void>;
};
