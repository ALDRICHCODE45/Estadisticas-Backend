import { createServer } from "node:http";
import { fileURLToPath } from "url";
import { Server as socketServer } from "socket.io";
import { Sockets } from "./sockets";
import cors from "cors";
import express from "express";
import path, { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export class Server {
  constructor() {
    this.port = process.env.PUERTO ?? 8080;
    this.app = express();
    this.server = createServer(this.app);
    this.io = new socketServer(this.server);
  }

  middlewares() {
    this.app.use(express.static(path.join(__dirname, "../public")));
    this.app.use(cors());
  }
  socketConfiguration() {
    new Sockets(this.io);
  }
  listen() {
    this.server.listen(this.port, () => {
      console.log(`app listen in port ${this.port}`);
    });
  }
  execute() {
    this.listen();
    this.socketConfiguration();
    this.middlewares();
  }
}
