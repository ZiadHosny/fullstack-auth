import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { useSwagger } from './common/swagger';
import { AppLogger } from './common/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(AppLogger);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  useSwagger(app);

  app.enableCors();

  app.use((req, res, next) => {
    logger.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
  });

  await app.listen(process.env.PORT ?? 3000);
  Logger.log('Server running on http://localhost:8000');
}
bootstrap();
