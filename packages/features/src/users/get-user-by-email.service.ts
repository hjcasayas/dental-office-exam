import type { UserEntity } from './user.entity.js';

type GetUserByEmailServiceParams = Pick<UserEntity, 'email'>;

type GetUserByEmailServiceResult = Omit<
  UserEntity,
  'hashedPassword' | 'createdDate' | 'updatedDate'
> | null;

type GetUserByEmailService = (
  params: GetUserByEmailServiceParams
) => Promise<GetUserByEmailServiceResult>;

export type {
  GetUserByEmailService,
  GetUserByEmailServiceParams,
  GetUserByEmailServiceResult,
};
