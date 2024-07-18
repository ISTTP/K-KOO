import 'dotenv/config';
import prisma from '@isttp/db/all';
import { getCakeColor, setCakeColor } from '../service/cake';
import { checkCakeColorType } from '@isttp/utils/all';
import { Router } from 'express';
import { authorize } from '../service/auth';
import { getCakeLettersReq } from '@isttp/schemas/all';
import { CakeTypeResponse } from '@isttp/types/all';

const router: Router = Router();

router.get('/cake/letters/:userId/:year/', async (req, res) => {
  const CAKE_PAGE = 7;
  const GRID_PAGE = 24;

  const result = getCakeLettersReq.parse(req);
  const userId = result.params.userId;
  const year = result.params.year;
  const keyword = result.query.keyword;
  const page = result.query.page;
  const pageSize = keyword === 'true' ? GRID_PAGE : CAKE_PAGE;
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

    const totalCount = await prisma.letter.count({
      where: {
        recipientId: userId,
        year: year,
      },
    });

    if (totalCount === 0) {
      res.status(200).json({ noData: true });
    } else {
      const responseData = letters.map((letter) => {
        const letterData: CakeTypeResponse = {
          nickname: letter.nickname,
          candleImageUrl: letter.candle.imageUrl,
          letterId: letter.letterId,
        };
        if (includeKeyword) {
          letterData.keyword = letter.keyword;
        }
        return letterData;
      });

      res.status(200).json({
        data: responseData,
        totalPage: Math.ceil(totalCount / pageSize),
        currentPage: pageNumber,
      });
    }
  } catch (error) {
    res.status(500).json({ message: '케이크 편지 불러오기 실패', error });
  }
});

router.get('/cake/:ownerId', async (req, res) => {
  try {
    const userId = req.params.ownerId;
    const cakeUserData = await prisma.user.findFirst({
      where: {
        userId,
      },
    });

    if (!cakeUserData) {
      return res.status(400).json({
        message: '잘못된 요청: 해당 사용자를 찾을 수 없습니다.',
      });
    }

    const today = new Date();
    const birthday = cakeUserData.birthday;
    const thisYearBdayAfter30 = new Date(
      today.getFullYear(),
      birthday.getMonth(),
      birthday.getDate() + 30,
    );

    const year =
      today > thisYearBdayAfter30
        ? today.getFullYear() + 1
        : today.getFullYear();

    res.status(200).json({
      nickname: cakeUserData.nickname,
      year: String(year),
    });
  } catch (error) {
    res.status(500).json({ message: '케이크 소유자 정보 조회 실패: ', error });
  }
});

router.get('/cake/color/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { sheetColor, creamColor } = await getCakeColor(userId);
    res.status(200).json({ sheetColor, creamColor });
  } catch (error) {
    res.status(500).json({ message: `색상 정보 조회 실패: ${error}` });
  }
});

router.put('/cake/color', authorize, async (req, res) => {
  const userId = req.userId;
  const { sheetColor, creamColor } = req.body;

  const isValid =
    sheetColor ||
    creamColor ||
    checkCakeColorType(sheetColor) ||
    checkCakeColorType(creamColor);

  if (!isValid)
    return res
      .status(400)
      .json({ message: '잘못된 요청: 색상 정보가 올바르지 않습니다.' });

  try {
    const updated = await setCakeColor({ userId, sheetColor, creamColor });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: `색상 정보 수정 실패: ${error}` });
  }
});

export default router;
