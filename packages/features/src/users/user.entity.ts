import type { BaseEntity } from '../common/base.entity.js';

export interface UserEntity extends BaseEntity {
  hashedPassword: string;
  firstName: string;
  lastName: string;
  email: string;
}
