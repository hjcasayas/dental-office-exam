import type { ApiSuccessResponse } from '../../common/api-responste.type.js';
import type {
  AddUserService,
  IsEmailAlreadyTakenService,
} from '../../users/index.js';
import {
  BadRequestError,
  type HashPasswordService,
  type LoggerService,
  type ParseSchemaService,
} from '../../utilities/index.js';

interface RegisterUseCaseParams {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

interface RegisterUseCaseDependencies {
  parseParamsSchema: ParseSchemaService<RegisterUseCaseParams>;
  isEmailAlreadyTaken: IsEmailAlreadyTakenService;
  hashPassword: HashPasswordService;
  addUser: AddUserService;
  logger: LoggerService;
}

type RegisterUseCase = (
  params: RegisterUseCaseParams
) => Promise<ApiSuccessResponse>;

function registerUseCase({
  parseParamsSchema,
  isEmailAlreadyTaken,
  hashPassword,
  addUser,
  logger,
}: RegisterUseCaseDependencies): RegisterUseCase {
  return async (params) => {
    const result = parseParamsSchema(params);

    if (!result.success) {
      throw logger.logAndReturnError(new BadRequestError(result.errors));
    }

    const { email, firstName, lastName, password } = result.data;

    const isTaken = await isEmailAlreadyTaken({ email });

    if (isTaken) {
      throw logger.logAndReturnError(
        new BadRequestError([
          { message: `Email is already taken`, field: 'email' },
          { message: email, forLogsOnly: true },
        ])
      );
    }

    const { hashedPassword } = await hashPassword({ password });

    await addUser({ firstName, lastName, email, hashedPassword });
    return logger.logAndReturnData({
      message: 'Successful registration',
      extraData: email,
    });
  };
}

export { registerUseCase, type RegisterUseCase, type RegisterUseCaseParams };
