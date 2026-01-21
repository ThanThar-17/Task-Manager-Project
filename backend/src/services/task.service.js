import prisma from "../prismaClient.js";
import {
  getAllTasks,
  findTaskById,
  updateTaskById
} from "../repositories/task.repository.js";

/**
 * CREATE TASK (ADMIN ONLY)
 * - Validates employees belong to selected department
 */
export const createNewTask = async (taskData) => {
  const {
    title,
    priority,
    status,
    dueDate,
    department,
    employeeIds
  } = taskData;

  // 1️⃣ Validate employees belong to department
  const employees = await prisma.user.findMany({
    where: {
      id: { in: employeeIds },
      department,
      role: "EMPLOYEE"
    }
  });

  if (employees.length !== employeeIds.length) {
    throw new Error("Some employees do not belong to this department");
  }

  // 2️⃣ Create task
  return prisma.task.create({
    data: {
      title,
      priority,
      status,
      dueDate: new Date(dueDate),
      department,
      employees: {
        connect: employees.map(e => ({ id: e.id }))
      }
    },
    include: {
      employees: true
    }
  });
};

/**
 * FETCH ALL TASKS (ADMIN)
 */
export const fetchAllTasks = async () => {
  return getAllTasks();
};

/**
 * FETCH TASKS FOR EMPLOYEE
 * - Assigned tasks OR same department tasks
 */
export const getTasksForEmployee = async (userId, department) => {
  return prisma.task.findMany({
    where: {
      OR: [
        { employees: { some: { id: userId } } },
        { department }
      ]
    },
    include: { employees: true }
  });
};

/**
 * UPDATE TASK
 * - ADMIN: full update
 * - EMPLOYEE: status only
 */
export const updateTaskStatus = async (id, data, user) => {
  const task = await findTaskById(id);
  if (!task) throw new Error("Task not found");

  // EMPLOYEE → status only
  if (user.role === "EMPLOYEE") {
    return updateTaskById(id, {
      status: data.status
    });
  }

  // ADMIN → full update
  const updateData = {
    title: data.title,
    priority: data.priority,
    status: data.status,
    dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    department: data.department,
    employees: data.employeeIds
      ? {
          set: data.employeeIds.map(id => ({ id: Number(id) }))
        }
      : undefined
  };

  return updateTaskById(id, updateData);
};
