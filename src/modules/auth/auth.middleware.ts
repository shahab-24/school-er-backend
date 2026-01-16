import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "./auth.types";

const JWT_SECRET = process.env.JWT_SECRET!;

export function authenticate(
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });

  const token = header.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
