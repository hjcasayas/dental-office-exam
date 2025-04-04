import type { GetUserByEmailService, UserEntity } from '@dental/features';
import { inMemoryDB } from './in-memory.db.js';

export const getUserByEmailServiceImpl: GetUserByEmailService = async ({
  email,
}) => {
  let user: UserEntity | null = null;

  for (const key in inMemoryDB.users) {
    if (Object.prototype.hasOwnProperty.call(inMemoryDB, key)) {
      const currentUser = inMemoryDB.users[key];
      if (currentUser?.email === email) {
        user = currentUser;
      }
    }
  }

  console.table(inMemoryDB.users);
  return user;
};
