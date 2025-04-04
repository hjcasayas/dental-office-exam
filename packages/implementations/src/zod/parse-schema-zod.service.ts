import type { ParseSchemaService } from '@dental/features/src/utilities/index.js';
import { Schema, ZodError } from 'zod';

export const parseSchemaZodService =
  <TInput, TOutput>(
    zodSchema: Schema<TOutput>
  ): ParseSchemaService<TInput, TOutput, ZodError> =>
  (config: TInput) => {
    const { success, data, error } = zodSchema.safeParse(config);

    if (success) {
      return { success, data };
    }

    return { success, error };
  };
