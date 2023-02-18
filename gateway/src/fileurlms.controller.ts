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
  Inject,
  HttpException
} from "@nestjs/common";
import { CreateFileUrlDto, UpdateFileUrlDto } from "./dto/fileurl.dto";
import { ResponseInterceptor } from "src/libs/core/response.interceptor";
import {
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiCreatedResponse
} from "@nestjs/swagger";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
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
  @ApiCreatedResponse({
    description:
      "This api creates a new record (appId, businessId, itemId must be unique togather).",
    type: () => CreateFileUrlDto
  })
  @ApiOperation({
    summary: "Create a new record"
  })
  async createFileUrl(@Body() createFileUrlDto: CreateFileUrlDto) {
    this.logger.info(
      `[src] [modules] [fileurl] [generateFileUrl] [POST - /fileurl] => ${JSON.stringify(
        createFileUrlDto
      )}`
    );

    try {
      return await firstValueFrom(
        this.fileurlServiceClient.send("create_fileurl", createFileUrlDto)
      );
    } catch (err: any) {
      this.logger.error(
        `[src] [modules] [fileurl] [generateFileUrl] [POST - /fileurl] => ${JSON.stringify(
          err
        )}`
      );

      throw new HttpException(err, err.statusCode);
    }
  }

  @Get(":id")
  @ApiOkResponse({
    description: "Get a record by id (soft deleted item included)",
    type: CreateFileUrlDto
  })
  @ApiOperation({
    summary: "Get a record by id"
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

  @Get()
  @ApiOkResponse({
    description: "Get all records (soft deleted item included)",
    type: CreateFileUrlDto,
    isArray: true
  })
  @ApiOperation({
    summary: "Get all records"
  })
  async getAllFileUrl() {
    this.logger.info(
      `[src] [modules] [fileurl] [getFileUrlById] [GET - /fileurl/:id] => ${JSON.stringify(
        null
      )}`
    );

    try {
      return await firstValueFrom(
        this.fileurlServiceClient.send("get_all_fileurl", "")
      );
    } catch (err: any) {
      this.logger.error(
        `[src] [modules] [fileurl] [generateFileUrl] [POST - /fileurl] => ${JSON.stringify(
          err
        )}`
      );

      throw new HttpException(err, err.statusCode);
    }
  }

  @Get(":appId/:businessId/:itemId")
  @ApiOkResponse({
    description:
      "Get a record by appId, businessId and itemId (soft deleted item included)",
    type: CreateFileUrlDto
  })
  @ApiOperation({
    summary: "Get a record by url params"
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

    try {
      return await firstValueFrom(
        this.fileurlServiceClient.send("get_fileurl", {
          appId,
          businessId,
          itemId
        })
      );
    } catch (err: any) {
      this.logger.error(
        `[src] [modules] [fileurl] [generateFileUrl] [POST - /fileurl] => ${JSON.stringify(
          err
        )}`
      );

      throw new HttpException(err, err.statusCode);
    }
  }

  @Patch(":id")
  @ApiOkResponse({
    description: "This api partially updates an existing record.",
    schema: {
      type: "object",
      properties: {
        error: { type: "boolean", default: false },
        statusCode: { type: "number", default: 200 },
        message: { type: "string", default: "OK" },
        type: { type: "string", default: "object" },
        data: {
          type: "object",
          properties: {
            generatedMaps: { type: "array", default: [] },
            raw: { type: "array", default: [] },
            affected: { type: "number", default: 1 }
          }
        }
      }
    }
  })
  @ApiOperation({
    summary: "Update an existing record by it's id"
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

    try {
      return await firstValueFrom(
        this.fileurlServiceClient.send("update_fileurl", {
          updateFileUrlDto,
          id
        })
      );
    } catch (err: any) {
      this.logger.error(
        `[src] [modules] [fileurl] [generateFileUrl] [POST - /fileurl] => ${JSON.stringify(
          err
        )}`
      );

      throw new HttpException(err, err.statusCode);
    }
  }

  @Delete(":id")
  @ApiOkResponse({
    description: "This api partially updates an existing record.",
    schema: {
      type: "object",
      properties: {
        error: { type: "boolean", default: false },
        statusCode: { type: "number", default: 200 },
        message: { type: "string", default: "OK" },
        type: { type: "string", default: "object" },
        data: {
          type: "object",
          properties: {
            generatedMaps: { type: "array", default: [] },
            raw: { type: "array", default: [] },
            affected: { type: "number", default: 1 }
          }
        }
      }
    }
  })
  @ApiOperation({
    summary: "Soft delete a record"
  })
  async deleteFileUrl(@Param("id") id: number) {
    this.logger.info(
      `[src] [modules] [fileurl] [deleteFileUrl] [DELETE - /fileurl/:id] => ${JSON.stringify(
        {
          id
        }
      )}`
    );

    try {
      return await firstValueFrom(
        this.fileurlServiceClient.send("delete_fileurl", id)
      );
    } catch (err: any) {
      this.logger.error(
        `[src] [modules] [fileurl] [generateFileUrl] [POST - /fileurl] => ${JSON.stringify(
          err
        )}`
      );

      throw new HttpException(err, err.statusCode);
    }
  }
}
