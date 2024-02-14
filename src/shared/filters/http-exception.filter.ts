import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const message =
      Array.isArray(exception?.message) && exception?.message.length > 0
        ? exception?.message[0]
        : exception.message;

    response.status(status).json({
      type: 'ERROR',
      code: status,
      message: message,
      timestamp: new Date().getTime(),
      path: request.url,
    });
  }
}
