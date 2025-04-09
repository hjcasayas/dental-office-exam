import type { Service } from '../common/service.type.js';
import type { UserEntity } from './user.entity.js';

type GetUserByEmailAndPasswordServiceParams = Pick<UserEntity, 'email'> & {
  password: string;
};

type GetUserByEmailAndPasswordServiceResult = Omit<
  UserEntity,
  'hashedPassword'
>;

export type GetUserByEmailAndPasswordService = Service<
  GetUserByEmailAndPasswordServiceParams,
  Promise<GetUserByEmailAndPasswordServiceResult | null>
>;
