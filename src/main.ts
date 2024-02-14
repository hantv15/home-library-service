import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './shared/services/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('v1/api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const PORT = configService.getEnv('PORT') || 3000;

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('The Home Library Service API description')
    .setVersion('1.0')
    .addServer(
      `http://${configService.getEnv('LOCAL_LISTEN_ADDR')}${configService.getEnv('PORT')}`,
      'http',
    )
    .addServer(
      `https://${configService.getEnv('LOCAL_LISTEN_ADDR')}${configService.getEnv('PORT')}`,
      'https',
    )
    .addTag('User', 'Operations about user')
    .addTag('Artist', 'Operations about artist')
    .addTag('Album', 'Everything about album of artist')
    .addTag('Track', 'Operations about track')
    .addTag('Favorites', 'Operations about Favorites')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/api', app, document);

  await app.listen(PORT);
}
bootstrap();
