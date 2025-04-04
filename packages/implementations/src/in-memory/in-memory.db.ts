import type { UserEntity } from '@dental/features/';

export interface InMemoryDB {
  users: Record<string, UserEntity>;
}

export const inMemoryDB: InMemoryDB = {
  users: {},
};
