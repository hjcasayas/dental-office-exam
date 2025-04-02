import type { AddUserService } from '@dental/features';
import { nanoid } from 'nanoid';
import { userInMemoryDB } from './in-memory.db.js';

export const addUserServiceImpl: AddUserService = async ({
  email,
  firstName,
  lastName,
}) => {
  const id = nanoid();
  userInMemoryDB[id] = {
    id,
    firstName,
    lastName,
    email,
    createdDate: new Date(),
    updatedDate: new Date(),
  };
  console.table(userInMemoryDB);
  return;
};
