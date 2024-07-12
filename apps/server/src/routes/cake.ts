import 'dotenv/config';
import { PrismaClient } from '@isttp/db/all';
import { CakeTypeResponse, CakeUserTypeResponse } from '@isttp/types/all';
import { verifyToken, decodeToken } from '@isttp/utils/all';
import { Router } from 'express';

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

    res.status(200).json({
      data: responseData,
      totalPage: Math.ceil(totalCount / pageSize),
      currentPage: pageNumber,
    });
  } catch (error) {
    res.status(500).json({ message: `케이크 편지 불러오기 실패 : ${error}` });
  }
});

export default router;

router.get('/cake/version', async (req, res) => {
  const accessToken = req.cookies.ACT;
  const cakeUserId = String(req.query.cakeUserId);

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
    const thisYearBirthday = new Date(
      today.getFullYear(),
      birthday.getMonth(),
      birthday.getDate(),
    );

    const year =
      today > thisYearBirthday ? today.getFullYear() + 1 : today.getFullYear();

    const responseData: CakeUserTypeResponse = {
      nickname: cakeUserData.nickname,
      year: String(year),
    };

    //act 유효성 검증
    let userId;
    try {
      if (verifyToken(accessToken)) {
        userId = decodeToken(accessToken);
      }
    } catch (error) {
      userId = null;
    }

    if (userId) {
      res.status(200).json({
        userId: userId,
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
