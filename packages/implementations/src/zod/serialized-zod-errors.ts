import type { SerializedError } from '@dental/features';
import type { ZodError } from 'zod';

export function serializedZodError(zodError: ZodError): SerializedError[] {
  const serializedErrors: SerializedError[] = [];

  const errorEntries = Object.entries(zodError.flatten().fieldErrors);
  errorEntries.forEach((error) => {
    serializedErrors.push({
      field: error[0],
      message: (error[1] as string[]).join(', '),
    });
  });

  return serializedErrors;
}
