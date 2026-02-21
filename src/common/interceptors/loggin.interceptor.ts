  import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    Logger,
  } from '@nestjs/common';
  import { Observable, tap } from 'rxjs';

  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();

      const { method, originalUrl } = request;
      const userId = request.user?.id;

      const start = Date.now();

      return next.handle().pipe(
        tap({
          next: () => {
            this.logger.log(
              JSON.stringify({
                action: 'http_request',
                method,
                route: originalUrl,
                userId,
                statusCode: response.statusCode,
                duration: Date.now() - start,
              }),
            );
          },
          error: (err) => {
            this.logger.error(
              JSON.stringify({
                action: 'http_request',
                method,
                route: originalUrl,
                userId,
                statusCode: response.statusCode,
                error: err.message,
                duration: Date.now() - start,
              }),
            );
          },
        }),
      );
    }
  }