import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { ResponseInterceptor } from "./libs/core/response.interceptor";
import { AppService } from "./app.service";
import { ILogger, Logger } from "./libs/logging/logger";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { MessagePattern } from "@nestjs/microservices";

@ApiTags("Health Check")
@UseInterceptors(ResponseInterceptor)
@Controller()
export class AppController {
  private readonly logger: ILogger = Logger.getLogger();
  constructor(private readonly appService: AppService) {}

  @Get("/health")
  @ApiOkResponse({
    description: "Get API Health"
  })
  @MessagePattern({ cmd: "health" })
  async getHealth(): Promise<null> {
    this.logger.info(
      `[src] [getHealth] [GET - /health] => ${JSON.stringify(null)}`
    );

    return await this.appService.getHealth();
  }
}
