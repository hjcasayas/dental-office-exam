import { ReasonPhrases, StatusCodes, type StatusKey } from '../index.js';
import { createErrorMessage } from './create-error-message.js';
import { CustomError } from './custom.error.js';
import type { SerializedError } from './serialized-error.type.js';

export class NotFoundError extends CustomError {
  statusKey: StatusKey = 'NOT_FOUND';
  statusCode = StatusCodes[this.statusKey];

  constructor(private errors: SerializedError[] = []) {
    super(createErrorMessage(ReasonPhrases['NOT_FOUND'], errors));
    Object.setPrototypeOf(this, NotFoundError.prototype);
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
      return `${this.message}: ${this.errors
        .map((error) => error.message)
        .join(', ')}.`;
    }

    return `${errorName}.`;
  };
}
