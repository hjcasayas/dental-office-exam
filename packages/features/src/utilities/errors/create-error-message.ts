import type { SerializedError } from './serialized-error.type.js';

export function createErrorMessage(
  message: string,
  errors: SerializedError[] = []
) {
  if (errors.length > 0) {
    return `${message}: ${errors
      .filter((error) => !error.forLogsOnly)
      .map((error) => error.message)
      .join(', ')}.`;
  }

  return `${message}.`;
}
