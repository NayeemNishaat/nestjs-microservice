import { Module } from "@nestjs/common";
import { FileUrlController } from "./file-url.controller";
import { fileUrlProvider } from "./file-url.provider";
import { DatabaseModule } from "src/modules/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [FileUrlController],
  providers: [...fileUrlProvider]
})
export class FileUrlModule {}
