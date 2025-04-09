import type { Service } from '../common/service.type.js';
import type { UserEntity } from './user.entity.js';

type GetUserByEmailServiceParams = Pick<UserEntity, 'email'>;

type GetUserByEmailServiceResult = UserEntity;

export type GetUserByEmailService = Service<
  GetUserByEmailServiceParams,
  Promise<GetUserByEmailServiceResult | null>
>;
