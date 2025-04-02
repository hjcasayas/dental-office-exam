import type { BaseEntity } from '../common/base.entity.js';
import type { UserRole } from './user.role.js';

export interface UserEntity extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  role?: UserRole[];
}
