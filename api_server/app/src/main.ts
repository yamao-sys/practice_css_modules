import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  app.use(bodyParser.json());
  app.enableCors({
    origin: 'http://localhost:3001',
  });
  await app.listen(1234);
}
bootstrap();
