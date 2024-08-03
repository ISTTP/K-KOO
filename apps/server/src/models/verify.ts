import prisma from "@isttp/db/all";

export async function createVerifyInfo({ email, code }: { email: string, code: number }) {
  return await prisma.verify.create({
    data: {
      email,
      code,
    }
  })
}

export async function getVerifyInfo(email: string) {
  return await prisma.verify.findFirst({
    where: {
      email,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function deleteVerifyInfo(email: string) {
  return await prisma.verify.deleteMany({
    where: {
      email,
    }
  })
}
