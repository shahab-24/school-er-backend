// src/modules/auth/auth.controller.ts - FIXED VERSION
import { Request, Response } from "express";
import { loginSchema } from "./auth.validation";
import { AuthService } from "./auth.service";

export const AuthController = {
  
  async login(req: Request, res: Response) {
    console.log("🔥 LOGIN ROUTE HIT");
    try {
      console.log("🔐 Login request received");

      // 1. Validate input
      const { email, password } = loginSchema.parse(req.body);

      // 2. Call service
      const data = await AuthService.login(email, password);

      // 3. Return success response
      res.json({
        ...data,
        timestamp: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error("❌ Login controller error:", error);

      // Handle different error types
      let statusCode = 400;
      let message = "Login failed";

      if (error.name === "ZodError") {
        message = "Invalid input format";
      } else if (error.message.includes("credentials")) {
        statusCode = 401;
        message = error.message;
      } else if (error.message.includes("required")) {
        statusCode = 400;
        message = error.message;
      }

      res.status(statusCode).json({
        success: false,
        message,
        timestamp: new Date().toISOString(),
        // Only show error details in development
        ...(process.env.NODE_ENV === "development" && { error: error.message }),
      });
    }
  },


 async me(req: Request, res: Response) {
    res.json({
      success: true,
      user: (req as any).user,
    })
 
}}
