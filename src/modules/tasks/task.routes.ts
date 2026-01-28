import express from "express";
import { protect } from "../../middleware/auth.middleware.js";

import {
  createTaskController,
  getTasksController,
  getTaskController,
  updateTaskController,
  deleteTaskController,
  toggleTaskController,
} from "./task.controller.js";

const router = express.Router();

/* Protected Task Routes */
router.use(protect);

/* CRUD Routes */
router.route("/")
  .get(getTasksController)
  .post(createTaskController);

router.route("/:id")
  .get(getTaskController)
  .patch(updateTaskController)
  .delete(deleteTaskController);

router.patch("/:id/toggle", toggleTaskController);

export default router;