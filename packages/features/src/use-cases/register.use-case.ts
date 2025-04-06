import type { AddUserService, GetUserByEmailService } from '../users/index.js';
import { ValidationError } from '../utilities/errors/validation.error.js';
import {
  BadRequestError,
  type HashPasswordService,
  type LoggerService,
  type ParseSchemaService,
} from '../utilities/index.js';

interface RegisterUseCaseParams {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

interface RegisterUseCaseDependencies {
  parseParamsSchema: ParseSchemaService<RegisterUseCaseParams>;
  getUserByEmail: GetUserByEmailService;
  hashPassword: HashPasswordService;
  addUser: AddUserService;
  logger: LoggerService;
}

type RegisterUseCase = (params: RegisterUseCaseParams) => Promise<void>;

function registerUseCase({
  parseParamsSchema,
  getUserByEmail,
  hashPassword,
  addUser,
  logger,
}: RegisterUseCaseDependencies): RegisterUseCase {
  return async (params) => {
    const { success, data, error } = parseParamsSchema(params);

    if (!success || data == null) {
      const validationError = error ?? new ValidationError();
      logger.log(
        'error',
        `${validationError.message}: ${params?.email ?? params?.firstName ?? params?.lastName}: ${validationError
          .serializeErrors()
          .map((error) => error.message)
          .join(', ')}.`
      );
      throw validationError;
    }

    const { email, firstName, lastName, password } = data;

    const existingUser = await getUserByEmail({ email });

    if (existingUser != null) {
      const badRequestError = new BadRequestError([
        { message: 'Email is already registered', field: 'email' },
      ]);
      logger.log('error', `${badRequestError.message}: ${existingUser.email}`);
      throw badRequestError;
    }

    const { hashedPassword } = await hashPassword({ password });

    logger.log('info', `Successfully registered user with email: ${email}`);
    await addUser({ firstName, lastName, email, hashedPassword });
    return;
  };
}

export { registerUseCase, type RegisterUseCase, type RegisterUseCaseParams };
