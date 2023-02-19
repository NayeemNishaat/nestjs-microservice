import { Module } from "@nestjs/common";
import { FileUrlController } from "./fileurl.controller";
import { fileUrlProvider } from "./fileurl.provider";
import { DatabaseModule } from "src/modules/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [FileUrlController],
  providers: [...fileUrlProvider]
})
export class FileUrlModule {}
