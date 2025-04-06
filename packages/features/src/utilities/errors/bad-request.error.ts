import { ReasonPhrases, StatusCodes } from '../index.js';
import { CustomError } from './custom.error.js';
import type { SerializedError } from './serialized-error.type.js';

export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  errors: SerializedError[];

  constructor(errors?: SerializedError[]) {
    super(ReasonPhrases.BAD_REQUEST);
    this.errors = errors ?? [];

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors = (): SerializedError[] => {
    if (this.errors != null && this.errors.length > 0) {
      return this.errors;
    }

    return [
      {
        message: this.message,
      },
    ];
  };
}
