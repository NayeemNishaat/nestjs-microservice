import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { ResponseBaseDTO } from "src/libs/core/base.dto";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import ResponseConstants from "src/constants/response.constant";

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseBaseDTO<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ResponseBaseDTO<T>> {
    return next.handle().pipe(
      map((data) => ({
        error:
          ResponseConstants.Common[
            context.switchToHttp().getResponse().statusCode
          ]?.error || false,
        statusCode:
          ResponseConstants.Common[
            context.switchToHttp().getResponse().statusCode
          ]?.statusCode || 200,
        message:
          ResponseConstants.Common[
            context.switchToHttp().getResponse().statusCode
          ]?.code || "OK",
        type: Array.isArray(data) ? "array" : "object",
        data: data
      }))
    );
  }
}
