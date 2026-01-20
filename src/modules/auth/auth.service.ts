// src/modules/auth/auth.service.ts
import bcrypt from "bcryptjs";
import { User } from "./auth.model";
import { JwtPayload } from "./auth.types";
import { safeJwtSign } from "../../utils/typesafe-wrapper";
import { env } from "../../core/config/env"; // ✅ MUST
// import { signJwt } from "../../utils/jwt.util";


const JWT_SECRET = env.JWT_SECRET; // ✅ validated, never undefined
const JWT_EXPIRES = env.JWT_EXPIRES_IN ?? "7d";

export const AuthService = {
  async login(email: string, password: string) {
    try {
      // 1. Input validation
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      // 2. Find user (case insensitive)
      const user = await User.findOne({
        email: email.toLowerCase().trim(),
        isActive: true,
      });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      if (!user.passwordHash) {
        throw new Error("Account not properly configured");
      }

      // 3. Verify password
      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) {
        throw new Error("Invalid credentials");
      }

      // 4. Create payload with proper user._id
      const payload: JwtPayload = {
        userId: user._id.toString(), // ✅ FIX: user._id not user.id
        role: user.role,
        // email: user.email,
      };

      // 5. Generate token
      const token = safeJwtSign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES,
      });

      // 6. Return response
      return {
        success: true,
        token,
        role: user.role,
        user: {
          id: user._id,
          email: user.email,
          // name: user.name,
          role: user.role,
        },
      };
    } catch (error: any) {
      console.error("AuthService.login error:", error);
      throw error; // Re-throw for controller
    }
  },
};
