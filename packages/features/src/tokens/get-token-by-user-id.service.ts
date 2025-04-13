import type { Service } from '../common/service.type.js';
import type { TokenEntity } from './token.entity.js';

type GetTokenByUserIdServiceParams = Pick<TokenEntity, 'userId' | 'token'>;

type GetTokenByUserIdServiceResult = TokenEntity | null;

type GetTokenByUserIdService = Service<
  GetTokenByUserIdServiceParams,
  Promise<GetTokenByUserIdServiceResult>
>;

export type {
  GetTokenByUserIdService,
  GetTokenByUserIdServiceParams,
  GetTokenByUserIdServiceResult,
};
