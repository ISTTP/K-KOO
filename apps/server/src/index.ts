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

server.get("/api/test", function (req, res) {
  res.send("하이");
});
