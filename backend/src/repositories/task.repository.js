import prisma from "../prismaClient.js";

export const createTask = (data) => {
    return prisma.task.create({
      data: {
        title: data.title,
        priority: data.priority,
        status: data.status,
        dueDate: new Date(data.dueDate),
        department: data.department,
        employees: {
          connect: data.employeeIds.map(id => ({ id }))
        }
      }
    });
  };

export const getAllTasks = () => {
  return prisma.task.findMany({
    include: { employees: true }
  });
};

export const findTaskById = (id) => {
  return prisma.task.findUnique({
    where: { id: Number(id) }
  });
};

export const updateTaskById = (id, data) => {
  return prisma.task.update({
    where: { id: Number(id) },
    data
  });
};
  export const getTasksForEmployee = (userId, department) => {
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
