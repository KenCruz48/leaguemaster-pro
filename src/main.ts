import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NextFunction, Request, Response } from 'express';

import { AppModule } from './app.module';

function applySecurityHeaders(_request: Request, response: Response, next: NextFunction): void {
  response.removeHeader('X-Powered-By');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('Referrer-Policy', 'no-referrer');
  response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(applySecurityHeaders);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
      stopAtFirstError: true,
      validationError: {
        target: false,
        value: false,
      },
    }),
  );

  const corsOrigins = configService
    .get<string>('CORS_ORIGINS', '')
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);

  if (corsOrigins.length > 0) {
    app.enableCors({
      origin: corsOrigins,
      methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  }

  app.enableShutdownHooks();

  const port = configService.getOrThrow<number>('PORT');
  await app.listen(port);
  Logger.log(`LeagueMaster Pro escuchando en el puerto ${port}`, 'Bootstrap');
}

void bootstrap().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  const trace = error instanceof Error ? error.stack : undefined;

  Logger.error(message, trace, 'Bootstrap');
  process.exitCode = 1;
});
