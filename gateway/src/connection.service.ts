import { Transport, TcpClientOptions } from "@nestjs/microservices";
import { FILEURL_SERVICE } from "./constants/provider.constant";

export class ConnectionService {
  private readonly connection: {
    [key: string]: TcpClientOptions;
  } = {};

  constructor() {
    this.connection[FILEURL_SERVICE] = {
      options: {
        port: +process.env.FILEURL_SERVICE_PORT,
        host: process.env.FILEURL_SERVICE_HOST
      },
      transport: Transport.TCP
    };
  }

  get(serviceName: string): TcpClientOptions {
    return this.connection[serviceName];
  }
}
