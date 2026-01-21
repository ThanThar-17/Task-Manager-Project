import prisma from "../prismaClient.js";

export const createUser = (data) => {
  return prisma.user.create({ data });
};

export const findUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email }
  });
};

export const findUserById = (id) => {
  return prisma.user.findUnique({
    where: { id: Number(id) }
  });
  
};
export const getAllUsers = () => {
  return prisma.user.findMany();
};

