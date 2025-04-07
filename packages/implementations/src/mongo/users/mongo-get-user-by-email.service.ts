import type {
  GetUserByEmailService,
  GetUserByEmailServiceParams,
  GetUserByEmailServiceResult,
} from '@dental/features';
import { UserModel } from './user.model.js';

export function mongoGetUserByEmailService(): GetUserByEmailService {
  return async (params: GetUserByEmailServiceParams) => {
    const existingUser = await UserModel.findOne({ email: params.email });

    if (existingUser == null) {
      return null;
    }

    const { id, firstName, lastName, email } = existingUser;
    return { id, firstName, lastName, email } as GetUserByEmailServiceResult;
  };
}
