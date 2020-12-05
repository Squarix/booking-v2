import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors());
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  await app.listen(3000);
}
bootstrap();
