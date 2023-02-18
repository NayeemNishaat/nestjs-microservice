import { NestFactory } from "@nestjs/core";
import { Transport, TcpOptions } from "@nestjs/microservices";
import { FileUrlModule } from "./fileurl.module";

async function server() {
  const app = await NestFactory.createMicroservice<TcpOptions>(FileUrlModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.HOST || "127.0.0.1",
      port: +process.env.PORT || 3010
    }
  });
  await app.listen();
}
server();
