import type {
  AddUserService,
  AddUserServiceParams,
  AddUserServiceResult,
} from '@dental/features';
import { UserModel } from './user.model.js';

export function mongoAddUserService(): AddUserService {
  return async (
    params: AddUserServiceParams
  ): Promise<AddUserServiceResult> => {
    await UserModel.save(params);
  };
}
