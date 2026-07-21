import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

/**
 * Interceptor for logging request and response details.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const method = request.method;
    const url = request.url;
    const now = Date.now();

    this.logger.log(`Incoming Request: [${method}] ${url}`);

    return next
      .handle()
      .pipe(
        tap(() => {
          const responseTime = Date.now() - now;
          this.logger.log(
            `Outgoing Response: [${method}] ${url} - Status: ${response.statusCode} - ${responseTime}ms`
          );
        }),
      );
  }
}
