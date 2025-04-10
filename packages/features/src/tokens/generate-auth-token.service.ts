import type { UseCase } from '../common/index.js';
import type { TokenEntity } from './token.entity.js';

export type GenerateAuthTokenServiceParams = Pick<TokenEntity, 'userId'>;
export type GenerateAuthTokenServiceResult = TokenEntity;

export type GenerateAuthTokenService = UseCase<
  GenerateAuthTokenServiceParams,
  GenerateAuthTokenServiceResult
>;
