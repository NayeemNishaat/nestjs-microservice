import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
// import { DatabaseModule } from "./modules/database/database.module";
import { ConfigModule } from "@nestjs/config";
// import { FileUrlModule } from "../../fileurlms/file-url.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true })
    // DatabaseModule,
    // FileUrlModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
