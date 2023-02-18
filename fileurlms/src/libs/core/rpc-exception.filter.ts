import { Catch, RpcExceptionFilter, ArgumentsHost } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { RpcException } from "@nestjs/microservices";
import { ILogger, Logger } from "../logging/logger";

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  private readonly logger: ILogger = Logger.getLogger();
  catch(exception: RpcException, _: ArgumentsHost): Observable<any> {
    this.logger.error(exception.message, exception.stack, exception.name);

    return throwError(() => {
      const err: any = exception.getError();

      if (err.error === true) return err;
      return {
        error: true,
        message: err.message,
        statusCode: 500
      };
    });
  }
}
