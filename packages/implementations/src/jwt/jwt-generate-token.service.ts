import { type GenerateTokenService } from '@dental/features';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from './create-jwt-payloads.js';

export function jwtGenerateTokenService(
  secret: string,
  { issuedAt, expires, blacklisted = false, type }: JwtPayload
): GenerateTokenService {
  return ({ userId }) => {
    const token = jwt.sign({ userId, issuedAt, blacklisted, type }, secret, {
      expiresIn: expires.getTime(),
    });
    return { issuedAt, userId, expires, token, type, blacklisted };
  };
}
