import type { SerializedError } from '../utilities/index.js';

export interface ApiSuccessResponse<TData = never> {
  success: true;
  message: string;
  data?: TData;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: SerializedError[];
}
