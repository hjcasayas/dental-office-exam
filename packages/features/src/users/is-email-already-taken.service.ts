import type { UserEntity } from './user.entity.js';

type IsEmailAlreadyTakenServiceParams = Pick<UserEntity, 'email'>;

type IsEmailAlreadyTakenServiceResult = boolean;

type IsEmailAlreadyTakenService = (
  params: IsEmailAlreadyTakenServiceParams
) => Promise<IsEmailAlreadyTakenServiceResult>;

export type {
  IsEmailAlreadyTakenService,
  IsEmailAlreadyTakenServiceParams,
  IsEmailAlreadyTakenServiceResult,
};
