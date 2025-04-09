import {
  CustomError,
  ReasonPhrases,
  StatusCodes,
  type LoggerService,
} from '@dental/features';
import type { ApiErrorResponse } from '@dental/features/src/common/api-responste.type.js';
import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';

function errorhandler({
  logger,
}: {
  logger: LoggerService;
}): ErrorRequestHandler {
  return (
    error: Error | CustomError,
    _req: Request,
    res: Response<ApiErrorResponse>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
  ) => {
    if (error instanceof CustomError) {
      const errorMessage = error.message;
      res.locals.errorMessage = errorMessage;

      res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.serializeErrors().filter((error) => !error.forLogsOnly),
      });
    } else {
      res.locals.errorMessage =
        error?.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR;
      logger.log('error', `${error.message}.`);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR,
        errors: [{ message: ReasonPhrases.INTERNAL_SERVER_ERROR }],
      });
    }
  };
}

export { errorhandler };
