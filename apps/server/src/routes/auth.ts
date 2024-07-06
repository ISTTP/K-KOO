import "dotenv/config";
import { TokenResponse } from "@repo/types";
import { KakaoResponse } from "@repo/types";
import { Router } from "express";
import axios from "axios";
import qs from "qs";

const router: Router = Router();

router.post("/auth/google", async (req, res) => {
  const GoogleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
  res.json({ GoogleAuthUrl });
});

router.post("/auth/google/redirect", async (req, res) => {
  // 인가 코드
  const code = req.body.code;

  // 액세스 토큰 발급
  const result = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      `code=${code}&` +
      `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
      `client_secret=${process.env.GOOGLE_CLIENT_SECRET}&` +
      `redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&` +
      "grant_type=authorization_code",
  });

  const tokens = (await result.json()) as TokenResponse;

  // 유저 정보 요청
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    },
  );

  const userInfo = await response.json();
  res.json(userInfo);

  // 받아온 유저 정보로 유저 생성 or 로그인
  // 로그인 성공 시 jwt 토큰 발급
  // jwt 토큰을 쿠키에 담아서 클라이언트에게 전달
});

/*카카오 로그인 redirect uri*/
router.get("/kakao/url", (_, res) => {
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

    const tokenInfo = result.data as KakaoResponse;
    res.json(tokenInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "에러!" });
  }
});

export default router;
