import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

// Connection test karne ke liye (Optional)
async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

testConnection();

export default prisma;