import 'dotenv/config';
import { PrismaClient } from '@isttp/db/all';
import { CakeTypeResponse } from '@isttp/types/all';
import { Router } from 'express';

const router: Router = Router();
const prisma = new PrismaClient();

router.get('/cake/:userId/:year/', async (req, res) => {
  const userId = Number(req.params.userId);
  const year = Number(req.params.year);
  const keyword = String(req.query);
  const page = Number(req.query.page);
  const pageSize = 7;
  const pageNumber = page ? page : 1;
  const includeKeyword = keyword === 'true' ? true : false;

  try {
    const letters = await prisma.letter.findMany({
      where: {
        recipientId: userId,
        year: year,
      },
      include: {
        candle: true,
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });
    /*총 페이지 수*/
    const totalCount = await prisma.letter.count({
      where: {
        recipientId: userId,
        year: year,
      },
    });

    const responseData = letters.map((letter) => {
      const letterData: CakeTypeResponse = {
        nickname: letter.nickname,
        candleImageUrl: letter.candle.imageUrl,
      };
      if (includeKeyword) {
        letterData.keyword = letter.keyword;
      }
      return letterData;
    });

    res.json({
      data: responseData,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: pageNumber,
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
