import type { LogLevel } from './log.levels.js';
import type { ApiSuccessResponse } from '../../common/api-responste.type.js';
import type { CustomError } from '../errors/custom.error.js';

type LoggerService = {
  log: (level: LogLevel, message: string) => void;
  logAndReturnData: <TData = never>(
    message: { message: string; extraData?: string },
    data?: TData
  ) => ApiSuccessResponse<TData>;
  logAndReturnError: (error: CustomError) => CustomError;
};

export { type LoggerService };
