import { Controller, UseFilters } from "@nestjs/common";
import { FileUrlService } from "./fileurl.service";
import { CreateFileUrlDto, UpdateFileUrlDto } from "./dto/fileurl.dto";
import { MessagePattern } from "@nestjs/microservices";
import { ILogger, Logger } from "./libs/logging/logger";
import { ExceptionFilter } from "./libs/core/rpc-exception.filter";

@Controller("fileurl")
@UseFilters(new ExceptionFilter())
export class FileUrlController {
  private readonly logger: ILogger = Logger.getLogger();
  constructor(private readonly fileUrlService: FileUrlService) {}

  @MessagePattern("create_fileurl")
  async createFileUrl(createFileUrlDto: CreateFileUrlDto) {
    this.logger.info(
      `[src] [createFileUrl] [POST - /fileurl] => ${JSON.stringify(
        createFileUrlDto
      )}`
    );

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
    this.logger.info(
      `[src] [updateFileUrl] [PATCH - /fileurl/:id] => ${JSON.stringify({
        ...updateFileUrlDto,
        id
      })}`
    );

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
    this.logger.info(
      `[src] [getFileUrl] [GET - /fileurl/:appId/:businessId/:itemId] => ${JSON.stringify(
        {
          appId,
          businessId,
          itemId
        }
      )}`
    );

    return await this.fileUrlService.getFileUrl(appId, businessId, itemId);
  }

  @MessagePattern("get_fileurl_by_id")
  async getFileUrlById(id: number) {
    this.logger.info(
      `[src] [getFileUrlById] [GET - /fileurl/:id] => ${JSON.stringify(id)}`
    );

    return await this.fileUrlService.getFileUrlById(id);
  }

  @MessagePattern("get_all_fileurl")
  async getAllFileUrl() {
    this.logger.info(
      `[src] [getAllFileUrl] [GET - /fileurl] => ${JSON.stringify(null)}`
    );

    return await this.fileUrlService.getAllFileUrl();
  }

  @MessagePattern("delete_fileurl")
  async deleteFileUrl(id: number) {
    this.logger.info(
      `[src] [deleteFileUrl] [DELETE - /fileurl] => ${JSON.stringify(id)}`
    );

    return await this.fileUrlService.deleteFileUrl(id);
  }
}
