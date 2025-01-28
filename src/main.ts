import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http.exception.filters';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
