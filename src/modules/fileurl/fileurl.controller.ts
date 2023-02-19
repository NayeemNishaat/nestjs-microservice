import { ILogger, Logger } from "../../libs/logging/logger";
import {
  Controller,
  Post,
  Patch,
  Get,
  Delete,
  Body,
  Param,
  UseInterceptors
} from "@nestjs/common";
import { FileUrlService } from "./fileurl.service";
import { CreateFileUrlDto, UpdateFileUrlDto } from "./dto/fileurl.dto";
import { ResponseInterceptor } from "src/libs/core/response.interceptor";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { MessagePattern, Payload } from "@nestjs/microservices";

@ApiTags("CRUD APIs")
@Controller("fileurl")
@UseInterceptors(ResponseInterceptor)
export class FileUrlController {
  private readonly logger: ILogger = Logger.getLogger();
  constructor(private readonly fileUrlService: FileUrlService) {}

  @Post()
  @ApiOkResponse({
    description:
      "Create A New File Url (appId, businessId, itemId must be unique togather)",
    type: CreateFileUrlDto
  })
  @MessagePattern({ cmd: "fileurl_created" })
  async createFileUrl(@Body() createFileUrlDto: CreateFileUrlDto) {
    this.logger.info(
      `[src] [modules] [fileurl] [generateFileUrl] [POST - /fileurl] => ${JSON.stringify(
        createFileUrlDto
      )}`
    );

    return await this.fileUrlService.createFileUrl(createFileUrlDto);
  }

  @Patch(":id")
  @ApiOkResponse({
    description: "This api partially updates a file url",
    type: UpdateFileUrlDto
  })
  @MessagePattern({ cmd: "fileurl_updated" })
  async updateFileUrl(
    @Body() updateFileUrlDto: UpdateFileUrlDto,
    @Param("id") id: number
  ) {
    this.logger.info(
      `[src] [modules] [fileurl] [updateFileUrl] [Patch - /fileurl/:id] => ${JSON.stringify(
        {
          ...updateFileUrlDto,
          id
        }
      )}`
    );

    return await this.fileUrlService.updateFileUrl(id, updateFileUrlDto);
  }

  @Get(":appId/:businessId/:itemId")
  @ApiOkResponse({
    description:
      "Get A File Url By appId, businessId and itemId (Soft Deleted Item Included)",
    type: CreateFileUrlDto
  })
  @MessagePattern({ cmd: "fileurl_read" })
  async getFileUrl(
    @Param("appId") appId: number,
    @Param("businessId") businessId: number,
    @Param("itemId") itemId: number
  ) {
    this.logger.info(
      `[src] [modules] [fileurl] [getFileUrl] [GET - /fileurl/:appId/:businessId/:itemId] => ${JSON.stringify(
        {
          appId,
          businessId,
          itemId
        }
      )}`
    );

    return await this.fileUrlService.getFileUrl(appId, businessId, itemId);
  }

  @Get(":id")
  @ApiOkResponse({
    description: "Get A File Url By Id (Soft Deleted Item Included)",
    type: CreateFileUrlDto
  })
  @MessagePattern({ cmd: "fileurl_read_id" })
  async getFileUrlById(@Param("id") id: number) {
    this.logger.info(
      `[src] [modules] [fileurl] [getFileUrlById] [GET - /fileurl/:id] => ${JSON.stringify(
        {
          id
        }
      )}`
    );

    return await this.fileUrlService.getFileUrlById(id);
  }

  @Delete(":id")
  @ApiOkResponse({
    description: "This api softly delets a file url"
  })
  @MessagePattern({ cmd: "fileurl_deleted" })
  async deleteFileUrl(@Param("id") id: number) {
    this.logger.info(
      `[src] [modules] [fileurl] [deleteFileUrl] [DELETE - /fileurl/:id] => ${JSON.stringify(
        {
          id
        }
      )}`
    );

    return await this.fileUrlService.deleteFileUrl(id);
  }
}
