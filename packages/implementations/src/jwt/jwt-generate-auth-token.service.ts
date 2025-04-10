import { type GenerateAuthTokenService } from '@dental/features';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from './create-jwt-payloads.js';

export function jwtGenerateAuthTokenService(
  secret: string,
  { issuedAt, expires, blacklisted = false, type }: JwtPayload
): GenerateAuthTokenService {
  return ({ userId }) => {
    const token = jwt.sign(
      { subject: { userId }, issuedAt, expires, blacklisted },
      secret
    );
    return { issuedAt, userId, expires, token, type, blacklisted };
  };
}
