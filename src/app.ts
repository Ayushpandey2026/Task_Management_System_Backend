import express from "express";
import  cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./modules/tasks/task.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use("/tasks", taskRoutes);
/* Auth Routes */
app.use("/auth", authRoutes);

/* Health Check */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Task Manager API is running 🚀",
  });
});

export default app;