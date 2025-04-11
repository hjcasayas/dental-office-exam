import { ReasonPhrases, StatusCodes, type StatusKey } from '../index.js';
import { CustomError } from './custom.error.js';
import type { SerializedError } from './serialized-error.type.js';
import { createErrorMessage } from './create-error-message.js';

export class UnauthorizedError extends CustomError {
  statusKey: StatusKey = 'UNAUTHORIZED';
  statusCode = StatusCodes[this.statusKey];

  constructor(private errors: SerializedError[] = []) {
    super(createErrorMessage(ReasonPhrases['UNAUTHORIZED'], errors));

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors = (): SerializedError[] => {
    if (this.errors.length > 0) {
      return this.errors;
    }

    return [{ message: ReasonPhrases[this.statusKey] }];
  };

  toLogs = (): string => {
    const errorName = ReasonPhrases[this.statusKey];
    if (this.errors.length > 0) {
      return `${errorName}: ${this.errors
        .map((error) => error.message)
        .join(', ')}.`;
    }

    return `${errorName}.`;
  };
}
