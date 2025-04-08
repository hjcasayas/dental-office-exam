import { Schema } from 'zod';

import { ValidationError, type ParseSchemaService } from '@dental/features';

import { serializedZodError } from './serialized-zod-errors.js';

export const parseSchemaZodService =
  <TInput>(zodSchema: Schema<TInput>): ParseSchemaService<TInput> =>
  (input: TInput) => {
    const { success, data, error } = zodSchema.safeParse(input);

    if (success && data != null) {
      return { success, data, error: null };
    }

    if (!success && error != null) {
      const serializedErrors = serializedZodError(error);

      return {
        success,
        data: null,
        error: new ValidationError(serializedErrors),
      };
    }

    return { success, data: null, error: null };
  };
