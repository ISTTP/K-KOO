import 'dotenv/config';
import { PrismaClient } from '@isttp/db/all';
import { Router } from 'express';
import { authorize } from '../service/auth';

const router: Router = Router();
const prisma = new PrismaClient();

router.get('/letter/:letterId', authorize, async (req, res) => {
  const letterId = Number(req.params.letterId);
  const letter = await prisma.letter.findFirst({
    where: {
      letterId,
    },
    include: {
      candle: true,
    },
  });

  res.status(200).json({
    contents: letter?.contents,
    nickname: letter?.nickname,
    candleImageUrl: letter?.candle.imageUrl,
  });
});

export default router;
