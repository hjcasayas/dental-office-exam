import { Schema } from 'zod';

import { serializedZodError } from '@dental/implementations/zod';
import { ValidationError } from '@dental/features';

export const validator =
  <TInput>(schema: Schema) =>
  (input: TInput) => {
    const { success, error } = schema.safeParse(input);

    if (!success || error != null) {
      throw new ValidationError(serializedZodError(error));
    }
  };
