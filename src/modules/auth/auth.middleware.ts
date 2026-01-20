import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticate() {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const header = req.headers.authorization;
      if (!header) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = header.replace("Bearer ", "");
      const payload = jwt.verify(token, process.env.JWT_SECRET!);

      (req as any).user = payload;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
}
