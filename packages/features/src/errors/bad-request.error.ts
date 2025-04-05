import { ReasonPhrases, StatusCodes } from '../utilities/index.js';
import { CustomError } from './custom.error.js';
import type { SerializedError } from './serialized-error.type.js';

export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;

  constructor(
    private errors?: SerializedError[],
    message?: string
  ) {
    super(message ?? ReasonPhrases.BAD_REQUEST);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors = (): SerializedError[] => {
    if (this.errors != null && this.errors.length > 0) {
      return this.errors;
    }

    return [
      {
        message: ReasonPhrases.BAD_REQUEST,
      },
    ];
  };
}
