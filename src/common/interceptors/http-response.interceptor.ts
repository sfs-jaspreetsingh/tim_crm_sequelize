import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';

// export class HttpResponseInterceptor implements NestInterceptor {
//   constructor(private readonly reflector: Reflector) {}
//   intercept(
//     context: ExecutionContext,
//     next: CallHandler<any>,
//   ): Observable<any> | Promise<Observable<any>> {
//     console.log('Before...');
//     const response = context.switchToHttp().getResponse();
//     const status = response.statusCode;
//     const message =
//       this.reflector.get<string>('message', context.getHandler()) || '';
//     return next.handle().pipe(
//       map((data) => ({
//         status,
//         message: message || '',
//         data,
//       })),
//     );
//   }
// }


@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse();

    const statusCode = response.statusCode;
    const message =
      this.reflector.get<string>('message', context.getHandler()) || '';
    return next.handle().pipe(
      map((data) => ({
        statusCode,
        message: message || '',
        data,
      })),
    );
  }
}