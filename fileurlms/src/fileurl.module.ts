import { Module } from "@nestjs/common";
import { FileUrlController } from "./fileurl.controller";
import { fileUrlProvider } from "./fileurl.provider";

@Module({
  imports: [],
  controllers: [FileUrlController],
  providers: [...fileUrlProvider]
})
export class FileUrlModule {}
