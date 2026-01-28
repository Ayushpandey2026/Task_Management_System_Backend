import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_SECRET = process.env.REFRESH_SECRET as string;

/* ------------------ Access Token ------------------ */
export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "15m",
  });
};

/* ------------------ Refresh Token ------------------ */
export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

/* ------------------ Verify Refresh Token ------------------ */
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET) as { userId: string };
};