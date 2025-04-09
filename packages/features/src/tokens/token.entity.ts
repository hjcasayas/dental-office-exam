import type { BaseEntity } from '../common/base.entity.js';
import type { Token } from './tokens.js';

export interface TokenEntity extends BaseEntity {
  token: string;
  userId: string;
  type: Token;
  expires: Date;
  blacklisted?: boolean;
}
