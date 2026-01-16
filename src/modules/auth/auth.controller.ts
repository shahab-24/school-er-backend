import { Request, Response } from "express";
import { loginSchema } from "./auth.validation";
import { AuthService } from "./auth.service";

export const AuthController = {
  async login(req: Request, res: Response) {
    const { email, password } = loginSchema.parse(req.body);
    const data = await AuthService.login(email, password);
    res.json(data);
  }
};
