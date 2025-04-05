import {
  CustomError,
  ReasonPhrases,
  StatusCodes,
  type SerializedErrors,
} from '@dental/features';
import type { ErrorRequestHandler, Request, Response } from 'express';

function errorhandler(): ErrorRequestHandler {
  return (
    error: Error | CustomError,
    _req: Request,
    res: Response<{ success: boolean; errors: SerializedErrors[] }>
  ) => {
    if (error instanceof CustomError) {
      res
        .status(error.statusCode)
        .json({ success: false, errors: error.serializeErrors() });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      errors: [{ message: ReasonPhrases.INTERNAL_SERVER_ERROR }],
    });
  };
}

export { errorhandler };
