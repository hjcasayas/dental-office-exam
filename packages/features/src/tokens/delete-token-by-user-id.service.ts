import type { Service } from '../common/service.type.js';
import type { TokenEntity } from './token.entity.js';

type DeleteTokenByUserIdServiceParams = Pick<TokenEntity, 'userId' | 'token'>;

type DeleteTokenByUserIdServiceResult = void;

type DeleteTokenByUserIdService = Service<
  DeleteTokenByUserIdServiceParams,
  Promise<DeleteTokenByUserIdServiceResult>
>;

export type {
  DeleteTokenByUserIdService,
  DeleteTokenByUserIdServiceParams,
  DeleteTokenByUserIdServiceResult,
};
