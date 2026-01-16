import { Request, Response, NextFunction } from "express";
import { Role } from "./auth.types";

export function requireRole(...roles: Role[]) {
  return (
    req: Request & { user?: { role: Role } },
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthenticated" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
