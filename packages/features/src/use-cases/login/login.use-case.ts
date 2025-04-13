import type { GetUserByEmailService } from '../../users/get-user-by-email.service.js';
import type { GenerateTokenService } from '../../tokens/generate-token.service.js';
import {
  BadRequestError,
  type ComparePasswordService,
  type LoggerService,
} from '../../utilities/index.js';
import type { UseCase } from '../../common/use-case.type.js';
import type { SaveTokenService, TokenEntity } from '../../tokens/index.js';
import type { ApiSuccessResponse } from '../../common/api-responste.type.js';

interface LoginUseCaseParams {
  password: string;
  email: string;
}

interface LoginUseCaseResult {
  accessToken: TokenEntity;
  refreshToken: TokenEntity;
}

interface LoginUseCaseDependencies {
  generateRefreshToken: GenerateTokenService;
  generateAccessToken: GenerateTokenService;
  comparePassword: ComparePasswordService;
  getUserByEmail: GetUserByEmailService;
  saveToken: SaveTokenService;
  logger: LoggerService;
}

type LoginUseCase = UseCase<
  LoginUseCaseParams,
  Promise<ApiSuccessResponse<LoginUseCaseResult>>
>;

function loginUseCase({
  generateRefreshToken,
  generateAccessToken,
  comparePassword,
  getUserByEmail,
  saveToken,
  logger,
}: LoginUseCaseDependencies): LoginUseCase {
  return async ({ email, password }) => {
    const user = await getUserByEmail({ email });

    if (user == null) {
      throw logger.logAndReturnError(
        new BadRequestError([
          {
            message: `User does not exist: ${email}`,
            field: 'email',
            forLogsOnly: true,
          },
          { message: 'Email and/or password is incorrect' },
        ])
      );
    }

    const passwordIsCorrent = await comparePassword({
      password,
      hashedPassword: user.hashedPassword,
    });

    if (!passwordIsCorrent) {
      throw logger.logAndReturnError(
        new BadRequestError([
          {
            message: `Wrong password for: ${email}`,
            field: 'password',
            forLogsOnly: true,
          },
          { message: 'Email and/or password is incorrect' },
        ])
      );
    }

    const accessTokenEntity = generateAccessToken({
      userId: user.id as string,
    });

    const refreshTokenEntity = generateRefreshToken({
      userId: user.id as string,
    });

    await saveToken(refreshTokenEntity);

    return logger.logAndReturnData(
      { message: 'Successful login', extraData: email },
      {
        accessToken: accessTokenEntity,
        refreshToken: refreshTokenEntity,
      }
    );
  };
}

export { loginUseCase, type LoginUseCase, type LoginUseCaseResult };
