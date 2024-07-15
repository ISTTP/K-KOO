import 'dotenv/config';
import { PrismaClient } from '@isttp/db/all';
import { Router } from 'express';
import { authorize } from '../service/auth';
import { LetterTypeReq } from '@isttp/schemas/all';
import { getUser } from '../models/user';

const router: Router = Router();
const prisma = new PrismaClient();

router.get('/letter/:letterId', authorize, async (req, res) => {
  const userId = req.userId;
  const result = LetterTypeReq.parse(req);
  const letterId = Number(result.params.letterId);

  try {
    const userData = await getUser(userId);

    const today = new Date();
    const birthday = new Date(userData!.birthday);

    const thisYearBday = new Date(
      today.getFullYear(),
      birthday.getMonth(),
      birthday.getDate(),
    );

    const letter = await prisma.letter.findFirst({
      where: {
        letterId,
      },
      include: {
        candle: true,
      },
    });

    if (!letter) {
      return res.status(500).json({ message: '편지가 존재하지 않습니다' });
    }

    const createdAt = new Date(letter.createdAt);

    if (createdAt <= thisYearBday) {
      return res.status(200).json({
        isOpen: true,
        contents: letter.contents,
        nickname: letter.nickname,
        candleImageUrl: letter.candle.imageUrl,
      });
    } else {
      return res.status(200).json({
        isOpen: false,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: `편지 조회 실패 : ${error}` });
  }
});

export default router;
