import 'dotenv/config';
import qs from 'qs';
import prisma from '@isttp/db/all';
import { Router } from 'express';
import { generateAccessToken, generateRefreshToken } from '@isttp/utils/all';
import {
  setAuthCookies,
  checkUser,
  handleLogin,
  getGoogleAccessToken,
  getKakaoAccessToken,
  getSocialUid,
  authorize,
  createHashedPassword,
} from '../service/auth';

const router: Router = Router();

/* 회원가입 API */
router.post('/auth/signup', async (req, res) => {
  const { id, password, email, nickname, birthday, loginType } = req.body;
  let Pwd = null;

  if (loginType === 'default') {
    Pwd = createHashedPassword(password);
  }

  try {
    const isExist = await checkUser(loginType, id);

    if (isExist) {
      throw new Error('이미 회원가입된 사용자입니다.');
    }

    const user = await prisma.user.create({
      data: {
        id,
        password: Pwd,
        email,
        nickname,
        birthday,
        loginType,
      },
    });

    const accessToken = generateAccessToken(user.userId);
    const refreshToken = generateRefreshToken();

    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({
      message: '회원가입에 성공하였습니다.',
      userId: user.userId,
    });
  } catch (error) {
    res.status(500).json({ message: `회원가입 실패 : ${error}` });
  }
});

/* 구글 로그인 redirect url */
/* eslint-disable @typescript-eslint/naming-convention */
router.post('/auth/google/url', async (req, res) => {
  try {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?${qs.stringify({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'email profile',
    })}`;
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ message: `구글 redirect uri 반환 실패 : ${error}` });
  }
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
    res.status(500).json({ message: '구글 로그인 실패 : ' + error });
  }
});

/*카카오 로그인 redirect uri*/
/* eslint-disable @typescript-eslint/naming-convention */
router.get('/auth/kakao/url', (_, res) => {
  try {
    const url = `https://kauth.kakao.com/oauth/authorize?${qs.stringify({
      client_id: process.env.KAKAO_CLIENT_ID,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      response_type: 'code',
    })}`;

    res.status(200).json({ url });
  } catch (error) {
    res
      .status(500)
      .json({ message: `카카오 redirect uri 반환 실패 : ${error}` });
  }
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
    res.status(500).json({ message: '카카오 로그인 실패 : ' + error });
  }
});

router.post('/auth/logout', authorize, (_, res) => {
  res.clearCookie('ACT');
  res.clearCookie('RFT');
  res.status(200).json({ message: '로그아웃 되었습니다.' });
});

router.post('/auth/signout', authorize, async (req, res) => {
  const userId = req.userId;

  try {
    await prisma.letter.deleteMany({
      where: {
        recipientId: userId,
      },
    });

    const deletedUser = await prisma.user.delete({
      where: {
        userId,
      },
    });

    await prisma.verify.deleteMany({
      where: {
        email: deletedUser.email ?? '',
      },
    })

    res.clearCookie('ACT');
    res.clearCookie('RFT');
    res.status(200).json({ message: '탈퇴 처리 되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: `탈퇴 처리 실패 : ${error}` });
  }
});

export default router;
