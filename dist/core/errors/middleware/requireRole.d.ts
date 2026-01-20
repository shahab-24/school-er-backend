import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth";
export declare const requireRole: (...allowedRoles: string[]) => (req: AuthRequest, _res: Response, next: NextFunction) => void;
