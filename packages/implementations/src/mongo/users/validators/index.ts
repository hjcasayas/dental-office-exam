import { Schema } from 'zod';

export const validator =
  <TInput>(schema: Schema) =>
  (input: TInput) => {
    const { success } = schema.safeParse(input);
    return success;
  };
