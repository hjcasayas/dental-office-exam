import type { SerializedError } from './serialized-error.type.js';

export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors: () => SerializedError[];
}
