import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { MyJwtPayload } from '@isttp/types/all';
import {
  JsonWebTokenError,
  TokenExpiredError,
  NotBeforeError,
} from 'jsonwebtoken';

const JWT_SECRET = `${process.env.JWT_SECRET}`;
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

export function decodeToken(token: string) {
  const payload = jwt.decode(token);
  if (payload && typeof payload === 'object' && 'userId' in payload) {
    return payload as MyJwtPayload;
  }
  return null;
}
