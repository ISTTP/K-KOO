import { PrismaClient } from '@isttp/db/all';
const prisma = new PrismaClient();

export async function getUser(userId: string) {
  return await prisma.user.findFirst({
    where: {
      userId,
    },
  });
}
