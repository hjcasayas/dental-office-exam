import type { UserEntity } from './user.entity.js';

type AddUserServiceParams = Pick<
  UserEntity,
  'firstName' | 'lastName' | 'email' | 'hashedPassword'
>;

type AddUserServiceResult = void;

type AddUserService = (
  params: AddUserServiceParams
) => Promise<AddUserServiceResult>;

export type { AddUserService, AddUserServiceParams, AddUserServiceResult };
