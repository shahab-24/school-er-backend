import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../httpErrors";


export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const auth = () => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedError("Token missing");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as any;

      req.user = {
        userId: decoded.userId,
        role: decoded.role,
      };

      next();
    } catch {
      throw new UnauthorizedError("Invalid token");
    }
  };
};
