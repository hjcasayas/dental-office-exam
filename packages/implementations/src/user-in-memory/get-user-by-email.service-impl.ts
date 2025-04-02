import type { GetUserByEmailService, UserEntity } from '@dental/features';
import { userInMemoryDB } from './in-memory.db.js';

export const getUserByEmailServiceImpl: GetUserByEmailService = async ({
  email,
}) => {
  let user: UserEntity | null = null;

  for (const key in userInMemoryDB) {
    if (Object.prototype.hasOwnProperty.call(userInMemoryDB, key)) {
      const currentUser = userInMemoryDB[key];
      if (currentUser?.email === email) {
        user = currentUser;
      }
    }
  }

  console.table(userInMemoryDB);
  return user;
};
