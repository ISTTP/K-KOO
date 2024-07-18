import prisma from '@isttp/db/all';
import { LetterType } from '@isttp/types/all';

export async function createLetter({
  senderId,
  recipientId,
  candleId,
  nickname,
  contents,
  keyword,
  year,
}: LetterType) {
  return await prisma.letter.create({
    data: {
      senderId,
      recipientId,
      candleId,
      nickname,
      contents,
      keyword,
      year,
    },
  });
}
