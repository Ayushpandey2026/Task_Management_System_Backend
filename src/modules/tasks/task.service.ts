import prisma from "../../config/db.js";

/* ---------------- Create Task ---------------- */
export const createTask = async (
  userId: string,
  title: string,
  description?: string
) => {
  return await prisma.task.create({
    data: {
      title,
      description,
      userId,
    },
  });
};

/* ---------------- Get All Tasks (Pagination + Filter + Search) ---------------- */
export const getTasks = async (
  userId: string,
  page: number,
  limit: number,
  status?: string,
  search?: string
) => {
  const skip = (page - 1) * limit;

  const where: any = {
    userId,
  };

  // Filter by completed status
  if (status === "completed") where.completed = true;
  if (status === "pending") where.completed = false;

  // Search by title
  if (search) {
    where.title = {
      contains: search,
      mode: "insensitive",
    };
  }

  const tasks = await prisma.task.findMany({
    where,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.task.count({ where });

  return {
    page,
    limit,
    total,
    tasks,
  };
};

/* ---------------- Get Single Task ---------------- */
export const getTaskById = async (userId: string, taskId: string) => {
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });

  if (!task) throw new Error("Task not found");

  return task;
};

/* ---------------- Update Task ---------------- */
export const updateTask = async (
  userId: string,
  taskId: string,
  data: any
) => {
  await getTaskById(userId, taskId);

  return await prisma.task.update({
    where: { id: taskId },
    data,
  });
};

/* ---------------- Delete Task ---------------- */
export const deleteTask = async (userId: string, taskId: string) => {
  await getTaskById(userId, taskId);

  return await prisma.task.delete({
    where: { id: taskId },
  });
};

/* ---------------- Toggle Task ---------------- */
export const toggleTask = async (userId: string, taskId: string) => {
  const task = await getTaskById(userId, taskId);

  return await prisma.task.update({
    where: { id: taskId },
    data: {
      completed: !task.completed,
    },
  });
};