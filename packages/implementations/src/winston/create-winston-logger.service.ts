import { createLogger, type LoggerOptions } from 'winston';

import type {
  ApiSuccessResponse,
  CustomError,
  LoggerService,
  LogLevel,
} from '@dental/features';

export function createWinstonLoggerService({
  options,
}: {
  options: LoggerOptions;
}): LoggerService {
  const logger = createLogger(options);

  const log = (logLevel: LogLevel, message: string) =>
    logger.log(logLevel, message);

  const logAndReturnData = <TData = never>(
    message: { message: string; extraData?: string },
    data?: TData
  ): ApiSuccessResponse<TData> => {
    log(
      'info',
      message.extraData != null && message.extraData.trim() !== ''
        ? `${message.message}: ${message.extraData}.`
        : `${message.message}.`
    );
    return {
      success: true,
      data,
      message: message.message,
    };
  };

  const logAndReturnError = (error: CustomError) => {
    log('error', error.toLogs());
    return error;
  };

  return { log, logAndReturnData, logAndReturnError };
}
