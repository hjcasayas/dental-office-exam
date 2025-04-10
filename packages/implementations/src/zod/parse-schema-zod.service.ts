import { Schema } from 'zod';

import { type ParseSchemaService } from '@dental/features';

import { serializedZodError } from './serialized-zod-errors.js';

export const parseSchemaZodService =
  <TInput>(zodSchema: Schema<TInput>): ParseSchemaService<TInput> =>
  (input: TInput) => {
    const { success, data, error } = zodSchema.safeParse(input);

    if (success) {
      return { success, data };
    }

    const serializedErrors = serializedZodError(error);
    return {
      success,
      errors: serializedErrors,
    };
  };
