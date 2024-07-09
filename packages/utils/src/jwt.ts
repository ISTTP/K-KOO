import jwt from 'jsonwebtoken';
import { PrismaClient } from '@isttp/db/all';
import {
  JsonWebTokenError,
  TokenExpiredError,
  NotBeforeError,
} from 'jsonwebtoken';
import 'dotenv/config';

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;
const ACT_EXPIRES_IN = 60 * 30;
const RFT_EXPIRES_IN = 60 * 60 * 24 * 14;
const JWT_ALGORITHM = 'HS256';

export function generateAccessToken(userId: number) {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: ACT_EXPIRES_IN,
    algorithm: JWT_ALGORITHM,
  });

  return accessToken;
}

export function generateRefreshToken() {
  const refreshToken = jwt.sign({}, JWT_SECRET, {
    expiresIn: RFT_EXPIRES_IN,
    algorithm: JWT_ALGORITHM,
  });

  return refreshToken;
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new Error('EXPIRED');
    } else if (error instanceof JsonWebTokenError) {
      throw new Error('INVALID');
    } else if (error instanceof NotBeforeError) {
      throw new Error('NOTBEFORE');
    } else {
      throw new Error('UNKNOWN');
    }
  }
}

export function reissueToken(userId: number) {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken();

  return { accessToken, refreshToken };
}

// 액세스 토큰이 유효하면 true
// 액세스 토큰이 만료되면 리프레시 토큰 검증
// 리프레시 토큰이 유효하면 새로운 액세스 토큰, 리프레시 토큰 발급, true, 리프레시 토큰 업뎃, set쿠키
// 리프레시 토큰도 만료되었으면 false -> 로그인페이지로 ㄱㄱ

export async function checkValidation({
  userId,
  accessToken,
  refreshToken,
}: {
  userId: number;
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
          const decoded = verifyToken(refreshToken);
          if (decoded instanceof Error) {
            return { message: 'EXPIRED' };
          }
          const tokens = reissueToken(userId);
          const newAccessToken = tokens.accessToken;
          const newRefreshToken = tokens.refreshToken;

          await prisma.user.update({
            where: {
              userId,
            },
            data: {
              refreshToken: newRefreshToken,
            },
          });
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
  }
}
