import {
  CustomError,
  ReasonPhrases,
  StatusCodes,
  type LoggerService,
  type SerializedError,
} from '@dental/features';
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
    res: Response<{
      success: boolean;
      message: string;
      errors: SerializedError[];
    }>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
  ) => {
    if (error instanceof CustomError) {
      const errorMessage = `${error.message}: ${error
        .serializeErrors()
        .map((error) => error.message)
        .join(', ')}.`;
      res.locals.errorMessage = errorMessage;
      logger.log('error', error.toLogs());

      res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.serializeErrors(),
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
