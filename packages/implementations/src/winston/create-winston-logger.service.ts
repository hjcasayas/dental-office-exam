import { createLogger, type LoggerOptions } from 'winston';

import type { LoggerService } from '@dental/features';

export function createWinstonLoggerService({
  options,
}: {
  options: LoggerOptions;
}): LoggerService {
  return createLogger(options);
}
