import type { GetUserByEmailService, UserEntity } from '@dental/features';
import { type InMemoryDB } from './in-memory.db.js';

export const inMemoryGetUserByEmailService =
  (db: InMemoryDB): GetUserByEmailService =>
  async ({ email }) => {
    let user: UserEntity | null = null;
    const users = db.users;
    for (const key in users) {
      if (Object.prototype.hasOwnProperty.call(users, key)) {
        const currentUser = users[key];
        if (currentUser?.email === email) {
          user = currentUser;
          break;
        }
      }
    }

    return user;
  };
