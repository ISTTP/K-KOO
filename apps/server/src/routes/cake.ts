import 'dotenv/config';
import { PrismaClient } from '@isttp/db/all';
import { getCakeColor, setCakeColor } from '../service/cake';
import { checkCakeColorType } from '@isttp/utils/all';
import { verifyToken, decodeToken } from '@isttp/utils/all';
import { Router } from 'express';
import { authorize } from '../service/auth';
import { CakeVerTypeReq, LettersTypeReq } from '@isttp/schemas/all';
import { CakeTypeResponse } from '@isttp/types/all';

const router: Router = Router();
const prisma = new PrismaClient();

router.get('/cake/letters/:userId/:year/', async (req, res) => {
  const result = LettersTypeReq.parse(req);
  const userId = result.params.userId;
  const year = Number(result.params.year);
  const keyword = result.query.keyword;
  const page = Number(result.query.page);
  const pageSize = keyword === 'true' ? 24 : 7;
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
  } catch (error) {
    res.status(500).json({ message: `케이크 편지 불러오기 실패 : ${error}` });
  }
});

router.get('/cake/version', async (req, res) => {
  const accessToken = req.cookies.ACT;
  const result = CakeVerTypeReq.parse(req);
  const cakeUserId = result.query.cakeUserId;

  try {
    const cakeUserData = await prisma.user.findFirst({
      where: {
        userId: cakeUserId,
      },
    });

    if (!cakeUserData) {
      return res.status(500).json({
        message: '케이크의 주인이 없습니다.',
      });
    }
    const today = new Date();
    const birthday = new Date(cakeUserData.birthday);
    const thisYearBdayAfter30 = new Date(
      today.getFullYear(),
      birthday.getMonth(),
      birthday.getDate() + 30,
    );

    const year =
      today > thisYearBdayAfter30
        ? today.getFullYear() + 1
        : today.getFullYear();

    const responseData = {
      nickname: cakeUserData.nickname,
      year: String(year),
    };

    let userId;
    try {
      if (verifyToken(accessToken)) {
        const payload = decodeToken(accessToken);
        userId = payload?.userId;
      }
    } catch (error) {
      userId = null;
    }

    if (userId) {
      res.status(200).json({
        userId,
        data: responseData,
      });
    } else {
      res.status(200).json({
        userId: null,
        data: responseData,
      });
    }
  } catch (error) {
    res.status(500).json({ message: `케이크 버전 구분 실패 : ${error}` });
  }
});

router.get('/cake/color/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { sheetColor, creamColor } = await getCakeColor(userId);
    res.status(200).json({ sheetColor, creamColor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `색상 정보 조회 실패: ${error}` });
  }
});

router.post('/cake/color', authorize, async (req, res) => {
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
    console.log(error);
    res.status(500).json({ message: `색상 정보 수정 실패: ${error}` });
  }
});

export default router;
