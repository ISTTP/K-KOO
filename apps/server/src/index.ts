import { createServer } from "./server";
import { PrismaClient } from "@repo/db";
import { User } from "@repo/types";
import { add } from "@repo/utils";
import { log } from "@repo/logger";

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

server.get("/api/test", async function (req, res) {
  const users = await getUsers();
  res.json(users);
});

server.get("/api/kakao/url", (_, res) => {
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
  res.status(200).json({ url });
});
