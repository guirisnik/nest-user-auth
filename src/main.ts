import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { LoggingInterceptor } from './logging.interceptor';
import { ValidationPipe } from '@nestjs/common';

config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  const { PORT = 8080 } = process.env;
  await app.listen(PORT, () => console.debug(`Server started on port ${PORT}`));
}
bootstrap();
