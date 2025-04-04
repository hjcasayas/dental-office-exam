import type { BaseEntity } from '../common/base.entity.js';
import type { UserRole } from './user.role.js';

export interface UserEntity extends BaseEntity {
  hashedPassword: string;
  role?: UserRole[];
  firstName: string;
  lastName: string;
  email: string;
}
