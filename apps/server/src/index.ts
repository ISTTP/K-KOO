import { createServer } from "./server";
import { log } from "@repo/logger";

import auth from "./routes/auth";

import "dotenv/config";

const port = process.env.SERVER_PORT;
const server = createServer();

server.listen(port, () => {
  log(`api running on ${port}`);
});

server.use("/api", auth);
