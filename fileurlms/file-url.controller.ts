import { ILogger, Logger } from "../gateway/src/libs/logging/logger";
import {
  Controller,
  Post,
  Patch,
  Get,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UsePipes, // Remark: Not required, using validation pipe globally
  ValidationPipe,
  ParseIntPipe // Remark: Not required, using transform pipe globally
} from "@nestjs/common";
import { FileUrlService } from "./file-url.service";
import { CreateFileUrlDto, UpdateFileUrlDto } from "./dto/file-url.dto";
import { ResponseInterceptor } from "src/libs/core/response.interceptor";
import { ApiOkResponse } from "@nestjs/swagger";

@Controller("fileurl")
@UseInterceptors(ResponseInterceptor)
export class FileUrlController {
  private readonly logger: ILogger = Logger.getLogger();
  constructor(private readonly fileUrlService: FileUrlService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true
    })
  )
  @ApiOkResponse({
    description:
      "Create A New File Url (appId, businessId, itemId must be unique togather)",
    type: CreateFileUrlDto
  })
  async createFileUrl(@Body() createFileUrlDto: CreateFileUrlDto) {
    this.logger.info(
      `[src] [modules] [certificate] [generateCertificate] [start] request :- ${JSON.stringify(
        createFileUrlDto
      )}`
    );

    return await this.fileUrlService.createFileUrl(createFileUrlDto);
  }

  @Patch(":id")
  async updateFileUrl(
    @Body() updateFileUrlDto: UpdateFileUrlDto,
    @Param("id") id: number
  ) {
    this.logger.info(
      `[src] [modules] [certificate] [updateShare] [start] request :- ${JSON.stringify(
        { ...updateFileUrlDto, id }
      )}`
    );

    return await this.fileUrlService.updateFileUrl(id, updateFileUrlDto);
  }

  @Get(":appId/:businessId/:itemId")
  @ApiOkResponse({
    description: "Get A File Url (Soft Deleted Item Included)",
    type: CreateFileUrlDto
  })
  async getFileUrl(
    @Param("appId") appId: number,
    @Param("businessId") businessId: number,
    @Param("itemId") itemId: number
  ) {
    this.logger.info(
      `[src] [modules] [certificate] [getCertificate] [start] request :- ${JSON.stringify(
        { appId, businessId, itemId }
      )}`
    );

    return await this.fileUrlService.getFileUrl(appId, businessId, itemId);
  }

  @Delete(":id")
  @ApiOkResponse({
    description: "This api softly delets a file url"
  })
  async deleteFileUrl(@Param("id", ParseIntPipe) id: number) {
    this.logger.info(
      `[src] [modules] [certificate] [getCertificate] [start] request :- ${JSON.stringify(
        { id }
      )}`
    );

    return await this.fileUrlService.deleteFileUrl(id);
  }
}
