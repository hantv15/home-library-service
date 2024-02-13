import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './shared/services/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/api');
  app.useGlobalPipes(new ValidationPipe());

  const PORT = configService.getEnv('PORT') || 3000;

  const config = new DocumentBuilder()
    .setTitle('Nest Blog')
    .setDescription('The blogs API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/api', app, document);

  await app.listen(PORT);
}
bootstrap();
