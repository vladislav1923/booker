import { createServer } from "./server";
import { log } from "@repo/logger/src";

const port = process.env.PORT || 3001;
const server = createServer();

server.listen(port, () => {
  log(`api running on ${port}`);
});
