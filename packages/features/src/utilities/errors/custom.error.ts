import type { StatusKey } from '../status-codes/index.js';
import type { SerializedError } from './serialized-error.type.js';

export abstract class CustomError extends Error {
  abstract statusKey: StatusKey;
  abstract statusCode: number;
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors: () => SerializedError[];
  abstract toLogs: () => string;
}
