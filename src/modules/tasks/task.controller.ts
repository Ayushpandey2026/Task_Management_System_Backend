import {type Response } from "express";
import { type AuthRequest } from "../../middleware/auth.middleware.js";
import { createTaskSchema, updateTaskSchema } from "./task.validation.js";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  toggleTask,
} from "./task.service.js";

/* ---------------- Create Task ---------------- */
export const createTaskController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;

    const validated = createTaskSchema.parse(req.body);

    const task = await createTask(userId, validated.title, validated.description);

    res.status(201).json(task);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/* ---------------- Get All Tasks ---------------- */
export const getTasksController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const status = req.query.status as string;
    const search = req.query.search as string;

    const result = await getTasks(userId, page, limit, status, search);

    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/* ---------------- Get Single Task ---------------- */
export const getTaskController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { id: taskId } = req.params; // Destructuring for cleaner code

    if (!taskId) {
      return res.status(400).json({ error: "Task ID is missing in request params" });
    }

    const task = await getTaskById(userId, taskId);

    res.status(200).json(task);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
/* ---------------- Update Task ---------------- */
export const updateTaskController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { id: taskId } = req.params;

    // 1. Guard Clause to handle 'undefined'
    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    const validated = updateTaskSchema.parse(req.body);
    const updatedTask = await updateTask(userId, taskId, validated);

    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/* ---------------- Delete Task ---------------- */
export const deleteTaskController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { id: taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    await deleteTask(userId, taskId);
    res.status(200).json({ message: "Task deleted successfully ✅" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/* ---------------- Toggle Task ---------------- */
export const toggleTaskController = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { id: taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    const toggled = await toggleTask(userId, taskId);
    res.status(200).json(toggled);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }

};