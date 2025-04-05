import { BadRequestError } from '../index.js';
import type { SerializedError } from './serialized-error.type.js';

export class ValidationError extends BadRequestError {
  constructor(errors?: SerializedError[], message?: string) {
    super(errors ?? [], message ?? 'Validation error.');
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
