import 'dotenv/config';
import { PrismaClient } from '@isttp/db/all';
import { GoogleTokenType, KakaoTokenType } from '@isttp/types/all';
import {
  generateAccessToken,
  generateRefreshToken,
  reissueToken,
} from '@isttp/utils/all';
import { Router } from 'express';
import axios from 'axios';
import qs from 'qs';

const router: Router = Router();
const prisma = new PrismaClient();

/* 회원 여부 확인 */

async function isExistUser(loginType: string, id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id,
      loginType,
    },
  });

  return user?.userId ?? null;
}

/* 회원가입 API */
router.post('/auth/signup', async (req, res) => {
  const { id, loginType, nickname, birthday } = req.body;

  try {
    const isExist = await isExistUser(loginType, id);

    if (isExist) {
      throw new Error('이미 회원가입된 사용자입니다.');
    }

    const user = await prisma.user.create({
      data: {
        id,
        nickname,
        birthday,
        loginType,
      },
    });

    const accessToken = generateAccessToken(user.userId);
    const refreshToken = generateRefreshToken();

    await prisma.user.update({
      where: {
        userId: user.userId,
      },
      data: {
        refreshToken,
      },
    });

    res
      .status(200)
      .clearCookie('ACT')
      .clearCookie('RFT')
      .setHeader('Set-Cookie', [
        `ACT=${accessToken}; HttpOnly; Path=/; SameSite=Lax`,
        `RFT=${refreshToken}; HttpOnly; Path=/; SameSite=Lax`,
      ])
      .json({ success: true, message: '회원가입 성공' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: `${error}` });
  }
});

/* 구글 로그인 redirect url */
router.post('/auth/google/url', async (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
  res.json({ url });
});

/* 구글 로그인 token 발급 */
router.post('/auth/google/login', async (req, res) => {
  const code = req.body.code; // 인가 코드

  try {
    // 액세스 토큰 발급
    /* eslint-disable @typescript-eslint/naming-convention */
    const result = await axios.post(
      'https://oauth2.googleapis.com/token',
      qs.stringify({
        code: code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const tokens = result.data as GoogleTokenType;

    // 유저 정보 요청
    const googleProfile = await axios.get(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      },
    );
    /* eslint-enable @typescript-eslint/naming-convention */

    const googleId = googleProfile.data.id;
    const userId = await isExistUser('google', googleId);

    // 회원일 경우 토큰 재발급, 토큰 반환
    if (userId) {
      const tokens = reissueToken(userId);
      const accessToken = tokens.accessToken;
      const refreshToken = tokens.refreshToken;

      await prisma.user.update({
        where: {
          userId,
        },
        data: {
          refreshToken,
        },
      });

      res
        .clearCookie('ACT')
        .clearCookie('RFT')
        .setHeader('Set-Cookie', [
          `ACT=${accessToken}; HttpOnly; Path=/; SameSite=Lax;`,
          `RFT=${refreshToken}; HttpOnly; Path=/; SameSite=Lax;`,
        ])
        .status(200)
        .json({
          success: true,
          message: '로그인 성공',
        });
    } else {
      // 회원이 아닐 경우 회원가입 유도
      res.json({
        message: '로그인 실패',
        success: false,
        id: googleId,
        loginType: 'google',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '구글 로그인 과정 중 에러' });
  }
});

/*카카오 로그인 redirect uri*/
router.get('/auth/kakao/url', (_, res) => {
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
  res.status(200).json({ url });
});

/*카카오 로그인 token 발급*/
router.post('/auth/kakao/login', async (req, res) => {
  const code = req.body.code;

  /* eslint-disable @typescript-eslint/naming-convention */
  try {
    const result = await axios.post(
      'https://kauth.kakao.com/oauth/token',
      qs.stringify({
        client_id: process.env.KAKAO_CLIENT_ID,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: process.env.KAKAO_REDIRECT_ID,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    /*사용자 id 정보 불러오기*/
    const tokenInfo = result.data as KakaoTokenType;
    const userInfo = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
      },
    });
    /* eslint-enable @typescript-eslint/naming-convention */

    const id = userInfo.data.id.toString();
    const userId = await isExistUser('kakao', id);

    if (userId) {
      //토큰 재발급
      const tokens = reissueToken(userId);
      const accessToken = tokens.accessToken;
      const refreshToken = tokens.refreshToken;

      await prisma.user.update({
        where: {
          userId,
        },
        data: {
          refreshToken,
        },
      });

      res
        .clearCookie('ACT')
        .clearCookie('RFT')
        .setHeader('Set-Cookie', [
          `ACT=${accessToken}; HttpOnly; Path=/; SameSite=Lax;`,
          `RFT=${refreshToken}; HttpOnly; Path=/; SameSite=Lax;`,
        ])
        .status(200)
        .json({
          success: true,
          message: '로그인 성공',
        });
    } else {
      res.json({
        message: '로그인 실패',
        success: false,
        id,
        loginType: 'kakao',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: '카카오 로그인 과정 중 에러' });
  }
});

export default router;
