// Nest Dependencies
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Other Dependencies
import * as Sentry from '@sentry/node';

// Local Dependencies
import { AppModule } from './app.module';
import { configService } from './shared/services/config.service';
import { SentryFilter } from './shared/filters/sentry.filter';

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
      `http://${configService.getEnv('LOCAL_LISTEN_ADDR')}:${configService.getEnv('PORT')}`,
      'http',
    )
    .addServer(
      `https://${configService.getEnv('LOCAL_LISTEN_ADDR')}:${configService.getEnv('PORT')}`,
      'https',
    )
    .addTag('User', 'Operations about user')
    .addTag('Artist', 'Operations about artist')
    .addTag('Album', 'Everything about album of artist')
    .addTag('Track', 'Operations about track')
    .addTag('Favorites', 'Operations about Favorites')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/api/doc', app, document);

  // Init Sentry
  Sentry.init({
    dsn: configService.getEnv("SENTRY_DNS"),
    enableTracing: true,
    // Performance Monitoring
    tracesSampleRate: 0.5 // Capture 100% of the transactions
  })

  app.useGlobalFilters(
    new SentryFilter(),
  );

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.use(Sentry.Handlers.errorHandler());

  await app.listen(PORT);
}
bootstrap();
