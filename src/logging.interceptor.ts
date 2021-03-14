import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = new Date();
    const [{ method, url, params, query, body }] = context.getArgs();

    Object.prototype.toString = function stringify() {
      return JSON.stringify(this);
    };
    return next
      .handle()
      .pipe(
        tap(() =>
          console.info(
            `[INFO - ${now.toUTCString()}] ${
              context.getClass().name
            } | ${method} -> ${url} | params: ${params} | query: ${query} | body: ${body}`,
          ),
        ),
      );
  }
}
