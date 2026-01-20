import { Request, Response, NextFunction } from "express";
import { randomUUID } from "crypto";
import { logger } from "./logger";

export function requestLogger(
  req: Request & { requestId?: string },
  _res: Response,
  next: NextFunction
) {
  req.requestId = randomUUID();

  logger.info(
    {
      requestId: req.requestId,
      method: req.method,
      path: req.path,
    },
    "Incoming request"
  );

  next();
}
