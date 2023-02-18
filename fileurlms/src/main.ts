import { NestFactory } from "@nestjs/core";
import { FileUrlModule } from "./fileurl.module";
import { Transport, TcpOptions } from "@nestjs/microservices";

async function server() {
  const app = await NestFactory.createMicroservice(FileUrlModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.HOST || "localhost",
      port: process.env.PORT || 3010
    }
  } as TcpOptions);
  await app.listen();
}
server();
