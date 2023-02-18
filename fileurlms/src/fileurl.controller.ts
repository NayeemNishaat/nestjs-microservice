import { Controller } from "@nestjs/common";
import { FileUrlService } from "./fileurl.service";
import { CreateFileUrlDto, UpdateFileUrlDto } from "./dto/fileurl.dto";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller("fileurl")
export class FileUrlController {
  constructor(private readonly fileUrlService: FileUrlService) {}

  @MessagePattern("create_fileurl")
  async createFileUrl(createFileUrlDto: CreateFileUrlDto) {
    return await this.fileUrlService.createFileUrl(createFileUrlDto);
  }

  @MessagePattern("update_fileurl")
  async updateFileUrl({
    updateFileUrlDto,
    id
  }: {
    updateFileUrlDto: UpdateFileUrlDto;
    id: number;
  }) {
    return await this.fileUrlService.updateFileUrl(id, updateFileUrlDto);
  }

  @MessagePattern("get_fileurl")
  async getFileUrl({
    appId,
    businessId,
    itemId
  }: {
    appId: number;
    businessId: number;
    itemId: number;
  }) {
    return await this.fileUrlService.getFileUrl(appId, businessId, itemId);
  }

  @MessagePattern("get_fileurl_by_id")
  async getFileUrlById(id: number) {
    return await this.fileUrlService.getFileUrlById(id);
  }

  @MessagePattern("delete_fileurl")
  async deleteFileUrl(id: number) {
    return await this.fileUrlService.deleteFileUrl(id);
  }
}
