import type { SaveTokenService } from '@dental/features';
import { TokenModel } from './token.model.js';

export function mongoSaveTokenService(): SaveTokenService {
  return async (tokenEntity) => {
    const { token, issuedAt, expires, userId, blacklisted, type } =
      await TokenModel.save(tokenEntity);
    return {
      blacklisted,
      issuedAt,
      expires,
      userId,
      token,
      type,
    };
  };
}
