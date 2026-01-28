import { type Request,type Response } from "express";
import { registerSchema, loginSchema } from "./auth.validation.js";
import { registerUser, loginUser } from "./auth.service.js";
import {
  generateAccessToken,
  verifyRefreshToken,
} from "../../utils/token.js";

/* ---------------- Register Controller ---------------- */
export const registerController = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);

    const result = await registerUser(
      validatedData.name,
      validatedData.email,
      validatedData.password
    );

    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

/* ---------------- Login Controller ---------------- */
export const loginController = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const result = await loginUser(
      validatedData.email,
      validatedData.password
    );

    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

/* ---------------- Refresh Token Controller ---------------- */
export const refreshController = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh token required" });
    }

    const decoded = verifyRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken(decoded.userId);

    return res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch {
    return res.status(401).json({
      error: "Invalid or expired refresh token",
    });
  }
};

/* ---------------- Logout Controller ---------------- */
export const logoutController = async (req: Request, res: Response) => {
  return res.status(200).json({
    message: "Logout successful ✅ (client should delete tokens)",
  });
};