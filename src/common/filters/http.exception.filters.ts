import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception.getStatus();

//     response.status(status).json({
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       message: exception.message,
//       error: exception.name,
//     });
//   }
// }

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const status = exception.getStatus();
//     const detail = exception.getResponse();
//     let message = '';
//     let validationError = [];
//     if (
//       status === 400 &&
//       detail &&
//       typeof detail === 'object' &&
//       Array.isArray(detail['message'])
//     ) {
//       // Extract validation errors
//       validationError = detail['message'];
//       // Pass validation errors as the primary message
//       // message = validationError.join(', ');
//       message = detail['message'][0];
//     } else {
//       message = detail['message']
//         ? detail['message']
//         : detail['error'] || 'Internal server error';
//     }

//     if (status === 403) {
//       message = 'You are Not Logged In || Forbidden resource';
//     }
//     response.status(status).json({
//       statusCode: status,
//       message,
//       data: {},
//     });
//   }
// }

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('=====exception===', exception, typeof exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let validationError = [];
    let data = {};

    // Handle HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const detail = exception.getResponse();
      console.log("exception instanceof HttpException");
      if (
        status === 400 &&
        detail &&
        typeof detail === 'object' &&
        Array.isArray((detail as any)['message'])
      ) {
        // Extract validation errors
        validationError = (detail as any)['message'];
        message = validationError[0];
      } else {
        message =
          (detail as any)['message'] ||
          (detail as any)['error'] ||
          'Internal server error';
      }

      if (status === 403) {
        message = 'You are Not Logged In || Forbidden resource';
      }
    }

    // Handle database errors (e.g., QueryFailedError from TypeORM)
    else if (exception instanceof QueryFailedError) {
      console.log("exception instanceof QueryFailedError");
      const error = exception as QueryFailedError;
      if ((error as any).code === 'ER_DUP_ENTRY') {
        status = HttpStatus.BAD_REQUEST;
        message = error.message;
      } else {
        message = error.message;
      }
    }

    // Handle other unhandled exceptions
    else if (exception instanceof Error) {
      console.log("exception instanceof Error");
      message = exception.message;
    }

    // Return a standardized error response
    response.status(status).json({
      statusCode: status,
      message,
      validationError,
      data,
    });
  }
}
