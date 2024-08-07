import prisma from '@isttp/db/all';

export async function getCandles() {
  return await prisma.candle.findMany();
}

export async function getCandle(candleId: number) {
  return await prisma.candle.findUnique({
    where: {
      candleId,
    },
  });
}
