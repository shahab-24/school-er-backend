import { Request, Response, NextFunction } from "express";
import { Role } from "./auth.types";
export declare function requireRole(...roles: Role[]): (req: Request & {
    user?: {
        role: Role;
    };
}, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
