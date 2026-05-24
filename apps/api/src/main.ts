import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import compression from 'compression';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp as string} [${level}] ${message as string}`;
          }),
        ),
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, { logger, rawBody: true });

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,

      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],

          scriptSrc: ["'self'"],

          objectSrc: ["'none'"],

          upgradeInsecureRequests: [],
        },
      },
    }),
  );
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

      forbidNonWhitelisted: true,

      transform: true,
    }),
  );

  app.use(cookieParser());

  app.enableCors({
    origin: [process.env.FRONTEND_URL],

    credentials: true,

    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],

    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');

  logger.log('Server is running on port 3001');
}

void bootstrap();
