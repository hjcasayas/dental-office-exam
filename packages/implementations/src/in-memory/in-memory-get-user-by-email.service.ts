import type { IsEmailAlreadyTakenService } from '@dental/features';
import { type InMemoryDB } from './in-memory.db.js';

export const inMemoryGetUserByEmailService =
  (db: InMemoryDB): IsEmailAlreadyTakenService =>
  async ({ email }) => {
    let isTaken = false;
    const users = db.users;
    for (const key in users) {
      if (Object.prototype.hasOwnProperty.call(users, key)) {
        const currentUser = users[key];
        if (currentUser?.email === email) {
          isTaken = true;
          break;
        }
      }
    }

    return isTaken;
  };
