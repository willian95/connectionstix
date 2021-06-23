import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0";
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(express.static(join(process.cwd(), './uploads/')));

  await app.listen(8000);
}
bootstrap();
