// import { Controller, Get, Res } from "@nestjs/common";
// import { Response } from "express";
// import { AppService } from "./app.service";
// import { ILogger, Logger } from "./libs/logging/logger";
// import { ApiOkResponse } from "@nestjs/swagger";

// @Controller()
// export class AppController {
//   private readonly logger: ILogger = Logger.getLogger();
//   constructor(private readonly appService: AppService) {}

//   @Get("/health")
//   @ApiOkResponse({
//     description: "Get API Health"
//   })
//   // @ApiNotFoundResponse({ description: "Resource not found" })
//   // @ApiForbiddenResponse({ description: "Unauthorized Request" })
//   // @ApiUnprocessableEntityResponse({ description: "Bad Request" })
//   async getHealth(@Res() res: Response) {
//     this.logger.info(
//       `[src] [getHealth] [start] request :- ${JSON.stringify({})}`
//     );
//     return await this.appService.getHealth(res);
//   }
// }
