import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "./auth.model";
import { JwtPayload } from "./auth.types";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || "7d";

export const AuthService = {
  async login(email: string, password: string) {
    const user = await User.findOne({ email, isActive: true });
    if (!user || !user.passwordHash) {
      throw new Error("Invalid credentials");
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new Error("Invalid credentials");

    const payload: JwtPayload = {
      userId: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });

    return { token, role: user.role };
  },
};
