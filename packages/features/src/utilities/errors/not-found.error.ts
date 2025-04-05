import { ReasonPhrases, StatusCodes } from '../index.js';
import { CustomError } from './custom.error.js';
import type { SerializedError } from './serialized-error.type.js';

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;

  constructor(
    private errors?: SerializedError[],
    message?: string
  ) {
    super(message ?? ReasonPhrases.NOT_FOUND);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors = (): SerializedError[] => {
    if (this.errors != null && this.errors.length > 0) {
      return this.errors;
    }

    return [{ message: ReasonPhrases.NOT_FOUND }];
  };
}
