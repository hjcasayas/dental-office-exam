import type { UserEntity } from './user.entity.js';

interface GetUserByEmailServiceParams {
  email: string;
}

type GetUserByEmailServiceResult = UserEntity | null;

type GetUserByEmailService = (
  params: GetUserByEmailServiceParams
) => Promise<GetUserByEmailServiceResult>;

const getUserByEmailService =
  (implementation: GetUserByEmailService): GetUserByEmailService =>
  async ({ email }: GetUserByEmailServiceParams) => {
    return await implementation({ email });
  };

export { getUserByEmailService, type GetUserByEmailService };
