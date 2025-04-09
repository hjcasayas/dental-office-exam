import type { GetUserByEmailService } from '@dental/features';
import { UserModel } from './user.model.js';

export function mongoGetUserByEmailService(): GetUserByEmailService {
  return async ({ email }) => {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser == null) {
      return null;
    }

    return existingUser;
  };
}
