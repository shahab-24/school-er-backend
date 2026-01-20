import { Response, NextFunction } from "express";
import { ForbiddenError } from "../httpErrors";
import { AuthRequest } from "./auth";

export const requireRole = (...allowedRoles: string[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ForbiddenError("Access denied");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ForbiddenError("Insufficient permission");
    }

    next();
  };
};
