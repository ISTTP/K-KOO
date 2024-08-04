import 'dotenv/config';
import prisma from '@isttp/db/all';
import cron from 'node-cron';
import { SHA256 } from 'crypto-js';

//만료된 인증 번호 삭제 (3분이 지난)
export async function deleteExpiredVerifyCode() {
  console.log(':: 만료된 인증 코드 삭제 스케줄러 시작 ::');
  cron.schedule('*/1 * * * *', async () => {
    await prisma.verify.deleteMany({
      where: {
        createdAt: {
          // less then or equal to: 3분보다 작거나 같음
          lte: new Date(Date.now() - 1000 * 60 * 3),
        },
      },
    });
  });
}

export function hashPassword(password: string) {
  const salt = process.env.PASSWORD_SALT;
  const combined = password + salt;
  const hashedPassword = SHA256(combined).toString();
  return hashedPassword;
}
