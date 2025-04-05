import { ReasonPhrases, StatusCodes } from '../utilities/index.js';
import { CustomError } from './custom.error.js';
import type { SerializedErrors } from './serialized-error.type.js';

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;

  constructor() {
    super(ReasonPhrases.NOT_FOUND);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors = (): SerializedErrors[] => {
    return [{ message: ReasonPhrases.NOT_FOUND }];
  };
}
