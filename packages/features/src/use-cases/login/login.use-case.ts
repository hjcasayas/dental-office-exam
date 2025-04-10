import type { GetUserByEmailService } from '../../users/get-user-by-email.service.js';
import type { GenerateAuthTokenService } from '../../tokens/generate-auth-token.service.js';
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
  generateRefreshToken: GenerateAuthTokenService;
  generateAccessToken: GenerateAuthTokenService;
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
      const badRequestError = new BadRequestError([
        {
          message: `User does not exist: ${email}`,
          field: 'email',
          forLogsOnly: true,
        },
        { message: 'Email and/or password is incorrect' },
      ]);
      logger.log('error', badRequestError.toLogs());
      throw badRequestError;
    }

    const passwordIsCorrent = await comparePassword({
      password,
      hashedPassword: user.hashedPassword,
    });

    if (!passwordIsCorrent) {
      const badRequestError = new BadRequestError([
        {
          message: `Wrong password for: ${email}`,
          field: 'password',
          forLogsOnly: true,
        },
        { message: 'Email and/or password is incorrect' },
      ]);
      logger.log('error', badRequestError.toLogs());
      throw badRequestError;
    }

    const accessTokenEntity = generateAccessToken({
      userId: user.id as string,
    });

    const refreshTokenEntity = generateRefreshToken({
      userId: user.id as string,
    });

    await saveToken(refreshTokenEntity);

    logger.log('info', `Successful login: ${email}`);
    return {
      success: true,
      message: 'Successful login',
      data: {
        accessToken: accessTokenEntity,
        refreshToken: refreshTokenEntity,
      },
    };
  };
}

export { loginUseCase, type LoginUseCase, type LoginUseCaseResult };
