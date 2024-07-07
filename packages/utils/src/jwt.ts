import jwt from 'jsonwebtoken';
import {
  JsonWebTokenError,
  TokenExpiredError,
  NotBeforeError,
} from 'jsonwebtoken';
import 'dotenv/config';

export function generateAccessToken(id: string) {
  const accessToken = jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: 60 * 60,
    algorithm: 'HS256',
  });

  return accessToken;
}

export function generateRefreshToken() {
  const refreshToken = jwt.sign({}, `${process.env.JWT_SECRET}`, {
    expiresIn: '14d',
    algorithm: 'HS256',
  });

  return refreshToken;
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return new Error('EXPIRED');
    } else if (error instanceof JsonWebTokenError) {
      return new Error('INVALID');
    } else if (error instanceof NotBeforeError) {
      return new Error('NOTBEFORE');
    } else {
      return new Error('UNKNOWN');
    }
  }
}

export function reissueToken(id: string) {
  const accessToken = generateAccessToken(id);
  const refreshToken = generateRefreshToken();

  return { accessToken, refreshToken };
}
