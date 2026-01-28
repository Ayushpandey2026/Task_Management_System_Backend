import { type Request,type Response,type NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { userId: string };
}

export const protect = (
  req: Request, // Standard Express Request use karein
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Not authorized, invalid header" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    // Yahan humne check laga diya taaki TS 'undefined' ki shikayat na kare
    if (!token || !secret) {
      return res.status(401).json({ error: "Token or Secret missing" });
    }

    const decoded = jwt.verify(token, secret) as { userId: string };

    // Yahan magic hai: 'req as any' karne se TS error nahi dega 
    // aur aapko interface alag se export/import nahi karna padega
    (req as any).user = { userId: decoded.userId };

    next();
  } catch (err: any) {
    return res.status(401).json({
      error: "Not authorized, invalid token",
      details: err.message,
    });
  }
};