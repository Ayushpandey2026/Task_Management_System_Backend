
import bcrypt from "bcrypt";
import prisma from "../../config/db.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/token.js";

/* ---------------- Register Service ---------------- */
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    message: "User registered successfully ✅",
    userId: user.id,
  };
};

/* ---------------- Login Service ---------------- */
export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return {
    message: "Login successful ✅",
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};