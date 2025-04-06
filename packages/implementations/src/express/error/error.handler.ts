import {
  CustomError,
  ReasonPhrases,
  StatusCodes,
  type SerializedError,
} from '@dental/features';
import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';

function errorhandler(): ErrorRequestHandler {
  return (
    error: Error | CustomError,
    _req: Request,
    res: Response<{
      success: boolean;
      message: string;
      errors: SerializedError[];
    }>,
    next: NextFunction
  ) => {
    if (error instanceof CustomError) {
      res.locals.errorMessage = `${error.message}: ${error
        .serializeErrors()
        .map((error) => error.message)
        .join(', ')}.`;
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.serializeErrors(),
      });
    } else {
      res.locals.errorMessage =
        error?.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message ?? ReasonPhrases.INTERNAL_SERVER_ERROR,
        errors: [{ message: ReasonPhrases.INTERNAL_SERVER_ERROR }],
      });
    }
    next();
  };
}

export { errorhandler };
