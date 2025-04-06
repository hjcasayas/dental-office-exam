import type { LoggerService } from '@dental/features';
import { createLogger, type LoggerOptions } from 'winston';

export function createWinstonLoggerService({
  options,
}: {
  options: LoggerOptions;
}): LoggerService {
  return createLogger(options);
}
