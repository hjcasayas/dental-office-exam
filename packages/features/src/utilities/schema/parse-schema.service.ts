export interface ParseSchemaServiceResult<TData, TError> {
  success: boolean;
  data?: TData | null;
  error?: TError | null;
}

export type ParseSchemaService<TInput, TOutput, TError> = (
  config: TInput
) => ParseSchemaServiceResult<TOutput, TError>;
