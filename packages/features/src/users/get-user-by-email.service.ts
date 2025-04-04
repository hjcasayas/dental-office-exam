import type { UserEntity } from './user.entity.js';

interface GetUserByEmailServiceParams {
  email: string;
}

type GetUserByEmailServiceResult = Omit<UserEntity, 'hashedPassword'> | null;

type GetUserByEmailService = (
  params: GetUserByEmailServiceParams
) => Promise<GetUserByEmailServiceResult>;

export { type GetUserByEmailService };
