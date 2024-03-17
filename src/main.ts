import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'body-parser';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/httpExceptionFilter.filter';
import { SuccessInterceptor } from './success.interceptor';

async function bootstrap() {
  try {
    const PORT = Number.parseInt(process.env.PORT, 10) || 3000;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new SuccessInterceptor());
    app.use(json({ limit: '50mb' }));

    await app.listen(PORT);
    console.info(`Aha Service Listening on port ${PORT}`);
  } catch (error) {
    throw error;
  }
}
bootstrap();
