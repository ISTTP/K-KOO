import { createServer } from "./server";
import { PrismaClient } from "@repo/db";
import { User } from "@repo/types";
import { add } from "@repo/utils";
import { log } from "@repo/logger";

import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

const port = process.env.PORT;
const server = createServer();

const user: User = {
  id: 1,
  name: "John Doe",
  email: "John@naver.com",
};

async function getUsers() {
  const users = await prisma.user.findMany();
  log(users);
  log(add(1, 2));
  log(user);
}

server.listen(port, () => {
  log(`api running on ${port}`);
  getUsers();
});

server.get("api/test", function (req, res) {
  res.send("하이");
});
