import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { AppService } from "./app.service";
import { ILogger, Logger } from "./libs/logging/logger";
import { ApiOkResponse } from "@nestjs/swagger";
import { ResponseInterceptor } from "src/libs/core/response.interceptor";

@Controller()
@UseInterceptors(ResponseInterceptor)
export class AppController {
  private readonly logger: ILogger = Logger.getLogger();
  constructor(private readonly appService: AppService) {}

  @Get("/health")
  @ApiOkResponse({
    description: "Get API Health"
  })
  async getHealth() {
    this.logger.info(
      `[src] [getHealth] [GET - /health] => ${JSON.stringify(null)}`
    );
    return await this.appService.getHealth();
  }
}
