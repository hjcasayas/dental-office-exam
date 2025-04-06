import type { AddUserService } from '@dental/features';
import { nanoid } from 'nanoid';
import { type InMemoryDB } from './in-memory.db.js';

export const inMemoryAddUserService =
  (inMemoryDB: InMemoryDB): AddUserService =>
  async ({ email, firstName, lastName, hashedPassword }) => {
    const id = nanoid();
    inMemoryDB.users[id] = {
      id,
      firstName,
      lastName,
      email,
      hashedPassword,
      createdDate: new Date(),
      updatedDate: new Date(),
    };

    return;
  };
