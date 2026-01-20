import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("🔥 GLOBAL ERROR:", err);

  res.status(400).json({
    success: false,
    message: err.message || "Something went wrong",
  });
}
