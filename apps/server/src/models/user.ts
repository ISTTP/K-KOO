import { PrismaClient } from '@isttp/db/all';
const prisma = new PrismaClient();

export async function getUser(userId: string) {
  return await prisma.user.findFirst({
    where: {
      userId,
    },
  });
}

export async function setUser(userId: string, data: object) {
  return await prisma.user.update({
    where: {
      userId,
    },
    data,
  });
}
