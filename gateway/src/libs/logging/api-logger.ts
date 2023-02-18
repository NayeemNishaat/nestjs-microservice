import { ILogger, Logger } from "./logger";

const morgan = require("morgan");

const logger: ILogger = Logger.getLogger();
export const APILogger = morgan("combined", {
  stream: <any>logger.getFileStream(),
  skip: function (request, _) {
    return request.path === "/api/health";
  }
});
