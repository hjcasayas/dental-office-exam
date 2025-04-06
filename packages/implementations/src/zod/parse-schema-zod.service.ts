import {
  ValidationError,
  type ParseSchemaService,
  type SerializedError,
} from '@dental/features';
import { Schema } from 'zod';

export const parseSchemaZodService =
  <TInput>(zodSchema: Schema<TInput>): ParseSchemaService<TInput> =>
  (input: TInput) => {
    const { success, data, error } = zodSchema.safeParse(input);

    if (success && data != null) {
      return { success, data, error: null };
    }

    if (!success && error != null) {
      const serializedErrors: SerializedError[] = [];

      const errorEntries = Object.entries(error.flatten().fieldErrors);
      errorEntries.forEach((error) => {
        serializedErrors.push({
          field: error[0],
          message: (error[1] as string[]).join(', '),
        });
      });

      return {
        success,
        data: null,
        error: new ValidationError(serializedErrors),
      };
    }

    return { success, data: null, error: null };
  };
