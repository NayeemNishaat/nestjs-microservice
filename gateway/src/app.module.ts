import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { FileUrlController } from "./fileurlms.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { FILEURL_SERVICE } from "./constants/provider.constant";
import { ClientProxyFactory } from "@nestjs/microservices";
import { ConnectionService } from "./connection.service";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, FileUrlController],
  providers: [
    AppService,
    ConnectionService,
    {
      provide: FILEURL_SERVICE,
      useFactory: (connectionService: ConnectionService) => {
        const fileurlServiceOptions = connectionService.get(FILEURL_SERVICE);
        return ClientProxyFactory.create(fileurlServiceOptions);
      },
      inject: [ConnectionService]
    }
  ]
})
export class AppModule {}
