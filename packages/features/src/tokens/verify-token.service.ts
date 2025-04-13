import type { Service } from '../common/service.type.js';
import type { TokenEntity } from './token.entity.js';

export type VerifyTokenServiceParams = Pick<TokenEntity, 'token'>;

export type VerifyTokenServiceResult = TokenEntity | null;

export type VerifyTokenService = Service<
  VerifyTokenServiceParams,
  Promise<VerifyTokenServiceResult>
>;
