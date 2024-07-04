import { createServer } from "./server";
import { PrismaClient } from "@repo/db";
import { User } from "@repo/types";
import { add } from "@repo/utils";
import { log } from "@repo/logger";
import axios from "axios";
import qs from "qs";

import "dotenv/config";

const prisma = new PrismaClient();

const port = process.env.SERVER_PORT || 3001;
const server = createServer();

const user: User = {
  id: 1,
  name: "John Doe",
  email: "John@naver.com",
};

async function getUsers() {
  const users = await prisma.user.findMany();
  log(add(1, 2));
  log(user);
  log(users);
  return users;
}

server.listen(port, () => {
  log(`api running on ${port}`);
  getUsers();
});

server.get("/api/kakao/url", (_, res) => {
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
  res.status(200).json({ url });
});


interface KakaoResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  refresh_token_expires_in: number;
};


server.post("/api/auth/kakao/login", async (req, res) => {
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
      }
    );

    const tokenInfo = result.data as KakaoResponse;
    res.json(tokenInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "에러!" });
  }

});
