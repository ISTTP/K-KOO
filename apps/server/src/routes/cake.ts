import 'dotenv/config';
import { PrismaClient } from '@isttp/db/all';
import { CakeTypeResponse } from '@isttp/types/all';
import {
  getCakeColor,
  setCakeColor,
  checkCakeColorType,
} from '../service/cake';
import { Router } from 'express';
import { authorize } from '../service/auth';

const router: Router = Router();
const prisma = new PrismaClient();

router.get('/cake/:userId/:year/', async (req, res) => {
  const userId = String(req.params.userId);
  const year = Number(req.params.year);
  const keyword = String(req.query.keyword);
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
      totalPage: Math.ceil(totalCount / pageSize),
      currentPage: pageNumber,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/cake/color', async (req, res) => {
  try {
    authorize(req, res, getCakeColor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '색상 정보를 불러오는데 실패했습니다.' });
  }
});

router.post('/cake/color', async (req, res) => {
  const { sheetColor, creamColor } = req.body;
  console.log(checkCakeColorType(sheetColor), checkCakeColorType(creamColor));
  const isValid =
    sheetColor ||
    creamColor ||
    checkCakeColorType(sheetColor) ||
    checkCakeColorType(creamColor);

  if (!isValid) {
    res.status(400).json({ message: '색상 정보가 올바르지 않습니다.' });
    return;
  }

  function setCakeColorCloser(userId: string) {
    return setCakeColor({ userId, sheetColor, creamColor });
  }

  try {
    authorize(req, res, setCakeColorCloser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: '색상 정보를 수정하는데 실패했습니다.' });
  }
});

export default router;
