import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { isPlainObject, pick } from 'lodash';

const API_EXCEPTION_PROPERTY_NAMES = ['subStatus', 'message'];

const isNativeHttpExceptions = (response: string | object): boolean =>
  isPlainObject(response) &&
  response.hasOwnProperty('message') &&
  !response.hasOwnProperty('subStatus');

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const timestamp = new Date().toISOString();
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: any = ctx.getResponse();
    const httpStatus: number = exception.getStatus();
    const exceptionResponse: string | object = exception.getResponse();
    const defaultRespBody = { subStatus: null, message: null, timestamp };

    if (isNativeHttpExceptions(exceptionResponse)) {
      console.error(`${exception.message}`, exceptionResponse);
      return response.status(httpStatus).json({
        subStatus: null,
        message: (exceptionResponse as any).message,
        timestamp,
      });
    }

    if (isPlainObject(exceptionResponse)) {
      const validRespBody: any = pick(
        exceptionResponse as object,
        API_EXCEPTION_PROPERTY_NAMES,
      );
      this.logger.error(`${exception.message}: ${validRespBody.subStatus}`);
      return response
        .status(httpStatus)
        .json({ ...defaultRespBody, ...validRespBody, timestamp });
    }

    this.logger.error(`${exceptionResponse}`);
    return response
      .status(httpStatus)
      .json({ subStatus: null, message: exceptionResponse, timestamp });
  }
}
