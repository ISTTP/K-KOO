import "dotenv/config";
import { TokenResponse } from "@repo/types";
import { Router } from "express";

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

export default router;
