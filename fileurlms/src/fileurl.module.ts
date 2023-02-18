import { Module } from "@nestjs/common";
import { FileUrlController } from "./fileurl.controller";
import { fileUrlProvider } from "./fileurl.provider";
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [FileUrlController],
  providers: [...fileUrlProvider]
})
export class FileUrlModule {}
