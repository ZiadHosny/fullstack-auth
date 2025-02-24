import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

@Injectable()
export class AppLogger implements LoggerService {
  private logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp(),
      format.printf(
        ({ timestamp, level, message }: any) =>
          `${timestamp} [${level.toUpperCase()}]: ${message}`,
      ),
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/combined.log' }),
    ],
  });

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(`${message} - ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
