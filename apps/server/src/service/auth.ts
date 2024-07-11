import axios from 'axios';
import qs from 'qs';

import { PrismaClient } from '@isttp/db/all';
import { reissueToken, verifyToken, decodeToken } from '@isttp/utils/all';
import { GoogleTokenType, KakaoTokenType } from '@isttp/types/all';
import { Request, Response } from 'express';
import { getUser } from '../models/user';

const prisma = new PrismaClient();

export async function updateRefreshToken(
  userId: string,
  newRefreshToken: string,
) {
  try {
    await prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    console.log('리프레시 토큰 수정 실패: ', error);
  }
}

export async function createUuid() {
  let isExist = true;
  while (isExist) {
    const userId = Math.random().toString(36).slice(2);
    const user = await getUser(userId);

    if (!user) {
      isExist = false;
      return userId;
    }
  }
}

export function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
) {
  res.setHeader('Set-Cookie', [
    `ACT=${accessToken}; HttpOnly; Path=/; SameSite=Lax;`,
    `RFT=${refreshToken}; HttpOnly; Path=/; SameSite=Lax;`,
  ]);
}

export function handleLogin(
  userId: string | null,
  res: Response,
  loginType: string,
  id: string,
) {
  if (userId) {
    const { accessToken, refreshToken } = reissueToken(userId);

    updateRefreshToken(userId, refreshToken);
    setAuthCookies(res, accessToken, refreshToken);

    res.status(200).json({
      success: true,
      userId: userId,
      message: '로그인에 성공하였습니다.',
    });
  } else {
    res.json({
      success: false,
      message: '회원가입이 필요합니다.',
      id: id,
      loginType: loginType,
    });
  }
}

export async function checkUser(loginType: string, id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id,
      loginType,
    },
  });

  return user?.userId ?? null;
}

/* eslint-disable @typescript-eslint/naming-convention */
export async function getGoogleAccessToken(code: string) {
  try {
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

    const { access_token } = result.data as GoogleTokenType;
    return access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getKakaoAccessToken(code: string) {
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

    const { access_token } = result.data as KakaoTokenType;
    return access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const userProfileUrls = {
  kakao: 'https://kapi.kakao.com/v2/user/me',
  google: 'https://www.googleapis.com/oauth2/v1/userinfo',
};

export async function getSocialUid(
  type: 'kakao' | 'google',
  code: string,
  getToken: (code: string) => Promise<string | null>,
) {
  try {
    const accessToken = await getToken(code);

    if (!accessToken) {
      throw new Error('잘못된 인가 코드입니다.');
    }

    const userInfo = await axios.get(userProfileUrls[type], {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userId = userInfo.data.id.toString();
    return userId;
  } catch (error) {
    console.log(error);
    return null;
  }
}
/* eslint-enable @typescript-eslint/naming-convention */

export async function checkValidation({
  userId,
  accessToken,
  refreshToken,
}: {
  userId: string;
  accessToken: string;
  refreshToken: string;
}) {
  try {
    verifyToken(accessToken);
    return { message: 'ACCESS_VALID' };
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case 'EXPIRED': {
          if (!refreshToken) {
            return { message: 'EXPIRED' };
          }

          const storedToken = await prisma.user.findFirst({
            where: {
              userId,
            },
            select: {
              refreshToken: true,
            },
          });

          if (storedToken?.refreshToken !== refreshToken) {
            return { message: 'EXPIRED' };
          }

          const decoded = verifyToken(refreshToken);
          if (decoded instanceof Error) {
            return { message: 'EXPIRED' };
          }
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            reissueToken(userId);

          updateRefreshToken(userId, newRefreshToken);

          return {
            message: 'REFRESH_VALID',
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          };
        }

        default:
          return { message: 'EXPIRED' };
      }
    }

    return { message: 'UNEXPECTED_ERROR' };
  }
}

/*api마다 인가할때*/
export async function authorize(
  req: Request,
  res: Response,
  callback: (userId: string) => Promise<object | null>,
) {
  const accessToken = req.cookies.ACT;
  const refreshToken = req.cookies.RFT;
  const payload = decodeToken(accessToken);

  if (!payload)
    return res.status(401).json({ message: '올바르지 않은 토큰입니다.' });

  const { userId } = payload;

  const data = await callback(userId);

  const result = await checkValidation({
    userId,
    accessToken,
    refreshToken,
  });

  switch (result?.message) {
    case 'ACCESS_VALID':
      res.status(200).json(data);
      break;
    case 'REFRESH_VALID':
      if (!result.accessToken || !result.refreshToken)
        return res.status(500).json({ message: 'server error' });
      setAuthCookies(res, result.accessToken, result.refreshToken);
      res.status(200).json(data);
      break;
    case 'EXPIRED':
      res.status(401).json(null);
      break;
  }
}
