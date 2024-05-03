import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import * as Sentry from '@sentry/node';

@Catch()
export class SentryFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();

   Sentry.captureException(exception, (scope) => {
    scope.clear();
    scope.setExtra('url', req.url);
    scope.setExtra('method', req.method);
    scope.setExtra('headers', req.rawHeaders);
    scope.setExtra('body', req.body);
    scope.setExtra('request', req);
    return scope;
   });

   super.catch(exception, host);
  }
}