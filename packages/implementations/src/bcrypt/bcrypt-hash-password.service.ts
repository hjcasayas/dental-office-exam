import type {
  HashPasswordService,
  HashPasswordServiceResult,
} from '@dental/features';
import { genSalt, hash } from 'bcrypt';

export function bcryptHashPasswordService(): HashPasswordService {
  return async ({ password }): Promise<HashPasswordServiceResult> => {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return { hashedPassword };
  };
}
