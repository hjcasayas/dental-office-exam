import type { SerializedError } from './serialized-error.type.js';

export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors: () => SerializedError[];

  toLogs = (): string => {
    let error = this.message;

    const serializedErrorsMessages = this.serializeErrors()
      .filter((error) => error.message != this.message)
      .map((error) => error.message);

    if (
      serializedErrorsMessages != null &&
      serializedErrorsMessages.length > 0
    ) {
      error += `: ${serializedErrorsMessages.join(', ')}`;
    }

    return `${error}.`;
  };
}
