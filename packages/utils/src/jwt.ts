import jwt from "jsonwebtoken";
import { JsonWebTokenError, TokenExpiredError, NotBeforeError } from "jsonwebtoken";
import "dotenv/config";

export const generateAccessToken = (id: string) => {
  const access_token = jwt.sign(
    { id },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: 60 * 60,
      algorithm: "HS256",
    },
  );

  return access_token;
};

export const generateRefreshToken = () => {
  const refresh_token = jwt.sign({}, `${process.env.JWT_SECRET}`, {
    expiresIn: "14d",
    algorithm: "HS256",
  });

  return refresh_token;
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return new Error("EXPIRED");
    } else if (error instanceof JsonWebTokenError) {
      return new Error("INVALID");
    } else if (error instanceof NotBeforeError) {
      return new Error("NOTBEFORE");
    } else {
      return new Error("UNKNOWN");
    }
  };
}

export const reissueToken = (id: string) => {
  const access_token = generateAccessToken(id);
  const refresh_token = generateRefreshToken();

  return { access_token, refresh_token }
}
