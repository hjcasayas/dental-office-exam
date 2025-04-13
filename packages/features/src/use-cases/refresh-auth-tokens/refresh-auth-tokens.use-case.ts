import type { ApiSuccessResponse } from '../../common/api-responste.type.js';
import type { UseCase } from '../../common/use-case.type.js';
import {
  type DeleteTokenByUserIdService,
  type GenerateTokenService,
  type GetTokenByUserIdService,
  type VerifyTokenService,
} from '../../tokens/index.js';
import type { TokenEntity } from '../../tokens/token.entity.js';
import {
  UnauthorizedError,
  type LoggerService,
} from '../../utilities/index.js';

type RefreshAuthTokensUseCaseParams = Pick<TokenEntity, 'token'>;
interface RefreshAuthTokensUseCaseResult {
  accessToken: TokenEntity;
  refreshToken: TokenEntity;
}

type RefreshAuthTokensUseCase = UseCase<
  RefreshAuthTokensUseCaseParams,
  Promise<ApiSuccessResponse<RefreshAuthTokensUseCaseResult>>
>;

interface RefreshAuthTokensUseCaseDependencies {
  deleteTokenByUserId: DeleteTokenByUserIdService;
  generateRefreshToken: GenerateTokenService;
  getTokenByUserId: GetTokenByUserIdService;
  generateAccessToken: GenerateTokenService;
  verifyToken: VerifyTokenService;
  logger: LoggerService;
}

function refreshAuthTokensUseCase({
  generateRefreshToken,
  deleteTokenByUserId,
  generateAccessToken,
  getTokenByUserId,
  verifyToken,
  logger,
}: RefreshAuthTokensUseCaseDependencies): RefreshAuthTokensUseCase {
  return async ({ token }) => {
    const verifiedRefreshToken = await verifyToken({ token });

    if (verifiedRefreshToken == null) {
      throw logger.logAndReturnError(
        new UnauthorizedError([{ message: 'Invalid token', forLogsOnly: true }])
      );
    }

    const { userId } = verifiedRefreshToken;
    const tokenEntity = await getTokenByUserId({ userId, token });

    if (tokenEntity == null) {
      throw logger.logAndReturnError(
        new UnauthorizedError([
          { message: 'Token not found', forLogsOnly: true },
        ])
      );
    }

    await deleteTokenByUserId({ userId, token });
    const refreshToken = generateRefreshToken({ userId });
    const accessToken = generateAccessToken({ userId });
    return logger.logAndReturnData(
      { message: 'Successful refresh auth tokens' },
      {
        accessToken,
        refreshToken,
      }
    );
  };
}

export {
  refreshAuthTokensUseCase,
  type RefreshAuthTokensUseCase,
  type RefreshAuthTokensUseCaseParams,
  type RefreshAuthTokensUseCaseResult,
};
