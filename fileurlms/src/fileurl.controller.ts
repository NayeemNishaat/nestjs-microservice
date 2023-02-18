import { Controller } from "@nestjs/common";
import { FileUrlService } from "./fileurl.service";
import { CreateFileUrlDto, UpdateFileUrlDto } from "./dto/fileurl.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("fileurl")
export class FileUrlController {
  constructor(private readonly fileUrlService: FileUrlService) {}

  @MessagePattern({ cmd: "fileurl_created" })
  async createFileUrl(createFileUrlDto: CreateFileUrlDto) {
    return await this.fileUrlService.createFileUrl(createFileUrlDto);
  }

  @MessagePattern({ cmd: "fileurl_updated" })
  async updateFileUrl(updateFileUrlDto: UpdateFileUrlDto, id: number) {
    return await this.fileUrlService.updateFileUrl(id, updateFileUrlDto);
  }

  @MessagePattern({ cmd: "fileurl_read" })
  async getFileUrl(appId: number, businessId: number, itemId: number) {
    return await this.fileUrlService.getFileUrl(appId, businessId, itemId);
  }

  @MessagePattern({ cmd: "fileurl_read_id" })
  async getFileUrlById(id: number) {
    return await this.fileUrlService.getFileUrlById(id);
  }

  @MessagePattern({ cmd: "fileurl_deleted" })
  async deleteFileUrl(id: number) {
    return await this.fileUrlService.deleteFileUrl(id);
  }
}
