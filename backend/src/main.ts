import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0";
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(process.env.PORT || 8000);
}
bootstrap();
