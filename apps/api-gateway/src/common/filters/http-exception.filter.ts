import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Global exception filter returning RFC 7807 Problem Details.
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : { message: 'Internal Server Error' };

    const message =
      typeof exceptionResponse === 'object' && 'message' in (exceptionResponse as any)
        ? (exceptionResponse as any).message
        : (exception as Error).message;

    this.logger.error(`[${request.method}] ${request.url} - ${status} - ${message}`);

    const problemDetails = {
      type: `https://httpstatuses.com/${status}`,
      title: exception instanceof HttpException ? exception.name : 'Internal Server Error',
      status,
      detail: message,
      instance: request.url,
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(problemDetails);
  }
}
