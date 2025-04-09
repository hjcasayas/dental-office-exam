import type { UseCase } from '../common/index.js';

export interface GenerateAuthTokenServiceParams {
  userId: string;
}
export interface GenerateAuthTokenServiceResult {
  token: string;
}

export type GenerateAuthTokenService = UseCase<
  GenerateAuthTokenServiceParams,
  GenerateAuthTokenServiceResult
>;
