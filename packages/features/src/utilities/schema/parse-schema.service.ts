import type { ValidationError } from '../errors/index.js';

export interface ParseSchemaServiceResult<TData> {
  success: boolean;
  data?: TData | null;
  error?: ValidationError | null;
}

export type ParseSchemaService<TInput> = (
  input: TInput
) => ParseSchemaServiceResult<TInput>;
