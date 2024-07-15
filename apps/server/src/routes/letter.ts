import 'dotenv/config';
import { PrismaClient } from '@isttp/db/all';
import { Router } from 'express';
import { authorize } from '../service/auth';
import { LetterTypeReq } from '@isttp/schemas/all';

const router: Router = Router();
const prisma = new PrismaClient();

router.get('/letter/:letterId', authorize, async (req, res) => {
  const result = LetterTypeReq.parse(req);
  const letterId = Number(result.params.letterId);

  try {
    const letter = await prisma.letter.findFirst({
      where: {
        letterId,
      },
      include: {
        candle: true,
      },
    });

    if (!letter) {
      res.status(500).json({ message: '편지가 존재하지 않습니다' });
    }

    res.status(200).json({
      contents: letter?.contents,
      nickname: letter?.nickname,
      candleImageUrl: letter?.candle.imageUrl,
    });
  } catch (error) {
    res.status(500).json({ message: `편지 조회 실패 : ${error}` });
  }
});

export default router;
