import { Logger } from 'winston';

import type { LoggerService } from '@dental/features';

export const loggerServiceImpl =
  (winstonLogger: Logger): LoggerService =>
  (level, message) => {
    winstonLogger.log(level, message);
  };
