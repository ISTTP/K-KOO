import prisma from '@isttp/db/all';

export async function getUser(userId: string) {
  return await prisma.user.findFirst({
    where: {
      userId,
    },
  });
}

export async function getUserBirthday(userId: string) {
  return await prisma.user.findFirst({
    where: {
      userId,
    },
    select: {
      birthday: true,
    },
  });
}

export async function getUserFromEmail(email: string) {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
}

export async function getUserFromId(id: string) {
  return await prisma.user.findFirst({
    where: {
      id,
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

export async function addPoint(userId: string, point: number) {
  return await prisma.user.update({
    where: {
      userId,
    },
    data: {
      point: {
        increment: point,
      },
    },
  });
}

export async function subtractPoint(userId: string, point: number) {
  return await prisma.user.update({
    where: {
      userId,
    },
    data: {
      point: {
        decrement: point,
      },
    },
  });
}
