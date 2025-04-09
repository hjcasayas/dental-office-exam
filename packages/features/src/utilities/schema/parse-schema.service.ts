import type { ValidationError } from '../errors/index.js';

export interface ParseSchemaServiceSuccessResult<TData> {
  success: true;
  data: TData;
}
export interface ParseSchemaServiceErrorResult {
  success: false;
  error: ValidationError;
}
export type ParseSchemaServiceResult<TData> =
  | ParseSchemaServiceSuccessResult<TData>
  | ParseSchemaServiceErrorResult;

export type ParseSchemaService<TInput> = (
  input: TInput
) => ParseSchemaServiceResult<TInput>;
