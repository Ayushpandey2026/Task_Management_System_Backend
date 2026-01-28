import { z } from "zod";

/* Create Task */
export const createTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
});

/* Update Task */
export const updateTaskSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});