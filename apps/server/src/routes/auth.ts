import "dotenv/config";
import { PrismaClient } from "@repo/db";
import { GoogleTokenType, KakaoTokenType } from "@repo/types";
import {
  generateAccessToken,
  generateRefreshToken,
  reissueToken,
} from "@repo/utils";
import { Router } from "express";
import axios from "axios";
import qs from "qs";

const router: Router = Router();
const prisma = new PrismaClient();

/* 회원 여부 확인 */
async function isExistUser(login_type: string, id: string) {
  const user = await prisma.user.findFirst({
    where: {
      id,
      login_type,
    },
  });

  return user ? user.user_id : null;
}

/* 회원가입 API */
router.post("/auth/signup", async (req, res) => {
  const { id, login_type, nickname, birthday } = req.body;

  try {
    const isExist = await isExistUser(login_type, id);

    if (isExist) {
      throw new Error("이미 회원가입된 사용자입니다.");
    }

    const user = await prisma.user.create({
      data: {
        id,
        nickname,
        birthday,
        login_type,
      },
    });

    const access_token = generateAccessToken(String(user.user_id));
    const refresh_token = generateRefreshToken();

    await prisma.user.update({
      where: {
        user_id: user.user_id,
      },
      data: {
        refresh_token,
      },
    });

    res
      .status(200)
      .setHeader("Set-Cookie", [
        `ACT=${access_token}; HttpOnly; SameSite=Lax`,
        `RFT=${refresh_token}; HttpOnly; SameSite=Lax`,
      ])
      .json({ success: true, message: "회원가입 성공" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: `${error}` });
  }
});

/* 구글 로그인 redirect url */
router.post("/auth/google/url", async (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
  res.json({ url });
});

/* 구글 로그인 token 발급 */
router.post("/auth/google/login", async (req, res) => {
  const code = req.body.code; // 인가 코드

  try {
    // 액세스 토큰 발급
    const result = await axios.post(
      "https://oauth2.googleapis.com/token",
      qs.stringify({
        code: code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const tokens = result.data as GoogleTokenType;

    // 유저 정보 요청
    const google_profile = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      },
    );
    const google_id = google_profile.data.id;
    const user_id = await isExistUser("google", google_id);

    // 회원일 경우 토큰 재발급, 토큰 반환
    if (user_id) {
      const tokens = reissueToken(String(user_id));
      const access_token = tokens.access_token;
      const refresh_token = tokens.refresh_token;

      await prisma.user.update({
        where: {
          user_id,
        },
        data: {
          refresh_token,
        },
      });

      res
        .setHeader("Set-Cookie", [
          `ACT=${access_token}; HttpOnly; SameSite=Lax`,
          `RFT=${refresh_token}; HttpOnly; SameSite=Lax`,
        ])
        .status(200)
        .json({
          success: true,
          message: "로그인 성공",
        });
    } else {
      // 회원이 아닐 경우 회원가입 유도
      res.json({
        message: "로그인 실패",
        success: false,
        id: google_id,
        login_type: "google",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "구글 로그인 과정 중 에러" });
  }
});

/*카카오 로그인 redirect uri*/
router.get("/auth/kakao/url", (_, res) => {
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
  res.status(200).json({ url });
});

/*카카오 로그인 token 발급*/
router.post("/auth/kakao/login", async (req, res) => {
  const code = req.body.code;

  try {
    const result = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      qs.stringify({
        client_id: process.env.KAKAO_CLIENT_ID,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: process.env.KAKAO_REDIRECT_ID,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    /*사용자 id 정보 불러오기*/
    const tokenInfo = result.data as KakaoTokenType;
    const userInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
      },
    });

    const id = userInfo.data.id.toString();
    const user_id = await isExistUser("kakao", id);

    if (user_id) {
      //토큰 재발급
      const tokens = reissueToken(String(user_id));
      const access_token = tokens.access_token;
      const refresh_token = tokens.refresh_token;

      await prisma.user.update({
        where: {
          user_id,
        },
        data: {
          refresh_token,
        },
      });

      res
        .setHeader("Set-Cookie", [
          `ACT=${access_token}; HttpOnly; SameSite=Lax`,
          `RFT=${refresh_token}; HttpOnly; SameSite=Lax`,
        ])
        .status(200)
        .json({
          success: true,
          message: "로그인 성공",
        });
    } else {
      res.json({
        message: "로그인 실패",
        success: false,
        id,
        login_type: "kakao",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "카카오 로그인 과정 중 에러" });
  }
});

export default router;
