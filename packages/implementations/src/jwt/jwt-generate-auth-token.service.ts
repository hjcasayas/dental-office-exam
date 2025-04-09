import type { GenerateAuthTokenService } from '@dental/features';
import jwt from 'jsonwebtoken';
import type { JwtExtraPayloads } from './get-jwt-extra-payloads.js';

export function jwtGenerateAuthTokenService(
  secret: string,
  extraPayloads: JwtExtraPayloads
): GenerateAuthTokenService {
  return ({ userId }) => {
    const token = jwt.sign({ subject: { userId, ...extraPayloads } }, secret);
    return { token };
  };
}
