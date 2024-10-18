import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    // Формируем ваш кастомный ответ
    const result = {
      success: false,
      // @ts-ignore
      result: Array.isArray(errorResponse.message)
        ? // @ts-ignore
          errorResponse.message.join(', ')
        : // @ts-ignore
          errorResponse.message,
    };

    response.status(status).json(result);
  }
}
