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
      res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.serializeErrors(),
      });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
      errors: [{ message: ReasonPhrases.INTERNAL_SERVER_ERROR }],
    });
    next();
  };
}

export { errorhandler };
