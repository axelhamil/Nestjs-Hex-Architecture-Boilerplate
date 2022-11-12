import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as os from 'os';
import { join } from 'path';

import { ForumModule } from './packages/forum/forum.module';

const port = process.env.PORT || 3000;

(async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ForumModule, {});

  // Express
  app.setGlobalPrefix('/api');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setViewEngine('ejs');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  // Swagger
  const options = new DocumentBuilder()
    .setTitle(process.env.TITLE_API)
    .setDescription(process.env.DESCRIPTION_API)
    .setVersion(process.env.VERSION_API)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
  Logger.log(`Server running on ${os.hostname}:${port}`, 'Bootstrap');
})();
