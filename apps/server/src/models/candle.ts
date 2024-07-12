import { PrismaClient } from '@isttp/db/all';
const prisma = new PrismaClient();

export async function getCandles() {
  return await prisma.candle.findMany();
}
