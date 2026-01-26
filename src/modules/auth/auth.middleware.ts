// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// export function authenticate() {
//   return (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const header = req.headers.authorization;
//       if (!header) {
//         return res.status(401).json({ message: "No token provided" });
//       }

//       const token = header.replace("Bearer ", "");
//       const payload = jwt.verify(token, process.env.JWT_SECRET!);

//       (req as any).user = payload;
//       next();
//     } catch (err) {
//       return res.status(401).json({ message: "Invalid or expired token" });
//     }
//   };
// }
// src/modules/auth/auth.middleware.ts - CORRECT VERSION
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "development-secret";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
    email?: string;
  };
}

export const authenticate = () => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      // 1. Get token from header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "No token provided"
        });
      }

      const token = authHeader.split(" ")[1];

      // 2. Verify token
      const decoded = jwt.verify(token, JWT_SECRET) as any;

      // 3. Attach user to request
      req.user = {
        userId: decoded.userId,
        role: decoded.role,
        email: decoded.email
      };

      next();
    } catch (error: any) {
      console.error("Authentication error:", error.message);
      
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid token"
        });
      }
      
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired"
        });
      }

      res.status(500).json({
        success: false,
        message: "Authentication failed"
      });
    }
  };
};