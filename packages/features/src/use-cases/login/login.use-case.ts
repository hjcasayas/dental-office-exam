import type { GetUserByEmailAndPasswordService } from '../../users/get-user-by-email-and-password.service.js';
import type { GenerateAuthTokenService } from '../../tokens/generate-auth-token.service.js';
import { BadRequestError, type LoggerService } from '../../utilities/index.js';
import type { UseCase } from '../../common/use-case.type.js';

interface LoginUseCaseParams {
  password: string;
  email: string;
}

interface LoginUseCaseResult {
  token: string;
}

interface LoginUseCaseDependencies {
  getUserByEmailAndPassword: GetUserByEmailAndPasswordService;
  generateAuthToken: GenerateAuthTokenService;
  logger: LoggerService;
}

type LoginUseCase = UseCase<LoginUseCaseParams, Promise<LoginUseCaseResult>>;

export function loginUseCase({
  getUserByEmailAndPassword,
  generateAuthToken,
  logger,
}: LoginUseCaseDependencies): LoginUseCase {
  return async ({ email, password }) => {
    const user = await getUserByEmailAndPassword({ email, password });

    if (user == null) {
      throw new BadRequestError([
        { message: 'Email or password is incorrect' },
      ]);
    }

    const { token } = generateAuthToken({
      userId: user.id as string,
    });

    logger.log('info', `Successful login: ${email}`);
    return { token };
  };
}
