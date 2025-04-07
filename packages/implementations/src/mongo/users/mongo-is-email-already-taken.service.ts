import type {
  IsEmailAlreadyTakenService,
  IsEmailAlreadyTakenServiceParams,
  IsEmailAlreadyTakenServiceResult,
} from '@dental/features';
import { UserModel } from './user.model.js';

export function mongoIsEmailAlreadyTakenService(): IsEmailAlreadyTakenService {
  return async (
    params: IsEmailAlreadyTakenServiceParams
  ): Promise<IsEmailAlreadyTakenServiceResult> => {
    const existingUser = await UserModel.findOne({ email: params.email });

    return existingUser != null;
  };
}
