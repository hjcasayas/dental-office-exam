import type { UseCase } from '../common/index.js';
import type { TokenEntity } from './token.entity.js';

export type GenerateTokenServiceParams = Pick<TokenEntity, 'userId'>;
export type GenerateTokenServiceResult = TokenEntity;

export type GenerateTokenService = UseCase<
  GenerateTokenServiceParams,
  GenerateTokenServiceResult
>;
