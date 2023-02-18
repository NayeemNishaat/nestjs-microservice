import { ILogger, Logger } from "./libs/logging/logger";
import {
  Controller,
  Post,
  Patch,
  Get,
  Delete,
  Body,
  Param,
  UseInterceptors,
  Inject
} from "@nestjs/common";
import { CreateFileUrlDto, UpdateFileUrlDto } from "./dto/fileurl.dto";
import { ResponseInterceptor } from "src/libs/core/response.interceptor";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { FILEURL_SERVICE } from "./constants/provider.constant";

@ApiTags("CRUD APIs")
@Controller("fileurl")
@UseInterceptors(ResponseInterceptor)
export class FileUrlController {
  private readonly logger: ILogger = Logger.getLogger();

  constructor(
    @Inject(FILEURL_SERVICE) private readonly fileurlServiceClient: ClientProxy
  ) {}

  @Post()
  @ApiOkResponse({
    description:
      "Create A New File Url (appId, businessId, itemId must be unique togather)",
    type: CreateFileUrlDto
  })
  async createFileUrl(@Body() createFileUrlDto: CreateFileUrlDto) {
    this.logger.info(
      `[src] [modules] [fileurl] [generateFileUrl] [POST - /fileurl] => ${JSON.stringify(
        createFileUrlDto
      )}`
    );

    return this.fileurlServiceClient.send("create_fileurl", createFileUrlDto);
  }

  @Patch(":id")
  @ApiOkResponse({
    description: "This api partially updates a file url",
    type: UpdateFileUrlDto
  })
  async updateFileUrl(
    @Body() updateFileUrlDto: UpdateFileUrlDto,
    @Param("id") id: number
  ) {
    this.logger.info(
      `[src] [modules] [fileurl] [updateFileUrl] [Patch - /fileurl/:id] => ${JSON.stringify(
        {
          updateFileUrlDto,
          id
        }
      )}`
    );

    return this.fileurlServiceClient.send("update_fileurl", {
      updateFileUrlDto,
      id
    });
  }

  @Get(":appId/:businessId/:itemId")
  @ApiOkResponse({
    description:
      "Get A File Url By appId, businessId and itemId (Soft Deleted Item Included)",
    type: CreateFileUrlDto
  })
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

    return this.fileurlServiceClient.send("get_fileurl", {
      appId,
      businessId,
      itemId
    });
  }

  @Get(":id")
  @ApiOkResponse({
    description: "Get A File Url By Id (Soft Deleted Item Included)",
    type: CreateFileUrlDto
  })
  async getFileUrlById(@Param("id") id: number) {
    this.logger.info(
      `[src] [modules] [fileurl] [getFileUrlById] [GET - /fileurl/:id] => ${JSON.stringify(
        {
          id
        }
      )}`
    );

    return this.fileurlServiceClient.send("get_fileurl_by_id", id);
  }

  @Delete(":id")
  @ApiOkResponse({
    description: "This api softly delets a file url"
  })
  async deleteFileUrl(@Param("id") id: number) {
    this.logger.info(
      `[src] [modules] [fileurl] [deleteFileUrl] [DELETE - /fileurl/:id] => ${JSON.stringify(
        {
          id
        }
      )}`
    );

    return this.fileurlServiceClient.send("delete_fileurl", id);
  }
}
