import 'dotenv/config';
import qs from 'qs';
import { PrismaClient } from '@isttp/db/all';
import { Router } from 'express';
import { generateAccessToken, generateRefreshToken } from '@isttp/utils/all';
import {
  updateRefreshToken,
  setAuthCookies,
  checkUser,
  handleLogin,
  getGoogleAccessToken,
  getKakaoAccessToken,
  getSocialUid,
} from '../service/auth';

const router: Router = Router();
const prisma = new PrismaClient();

/* 회원가입 API */
router.post('/auth/signup', async (req, res) => {
  const { id, loginType, nickname, birthday } = req.body;

  try {
    const isExist = await checkUser(loginType, id);

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

    updateRefreshToken(user.userId, refreshToken);
    setAuthCookies(res, accessToken, refreshToken);

    res
      .status(200)
      .json({ success: true, message: '회원가입에 성공하였습니다.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: `${error}` });
  }
});

/* 구글 로그인 redirect url */
/* eslint-disable @typescript-eslint/naming-convention */
router.post('/auth/google/url', async (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?${qs.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'email profile',
  })}`;
  res.json({ url });
});
/* eslint-enable @typescript-eslint/naming-convention */

/* 구글 로그인 token 발급 */
router.post('/auth/google/login', async (req, res) => {
  const code = req.body.code; // 인가 코드

  try {
    const googleId = await getSocialUid('google', code, getGoogleAccessToken);
    const userId = await checkUser('google', googleId);

    handleLogin(userId, res, 'google', googleId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error with google login: ' + error });
  }
});

/*카카오 로그인 redirect uri*/
/* eslint-disable @typescript-eslint/naming-convention */
router.get('/auth/kakao/url', (_, res) => {
  const url = `https://kauth.kakao.com/oauth/authorize?${qs.stringify({
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
    response_type: 'code',
  })}`;

  res.status(200).json({ url });
});
/* eslint-enable @typescript-eslint/naming-convention */

/*카카오 로그인 token 발급*/
router.post('/auth/kakao/login', async (req, res) => {
  const code = req.body.code;

  try {
    const kakaoId = await getSocialUid('kakao', code, getKakaoAccessToken);
    const userId = await checkUser('kakao', kakaoId);

    handleLogin(userId, res, 'kakao', kakaoId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error with kakao login: ' + error });
  }
});

export default router;
