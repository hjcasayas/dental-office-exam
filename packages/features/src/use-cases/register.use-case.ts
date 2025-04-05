import { log } from 'console';
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
  log: LoggerService;
}

type RegisterUseCase = (params: RegisterUseCaseParams) => Promise<void>;

function registerUseCase({
  parseParamsSchema,
  getUserByEmail,
  hashPassword,
  addUser,
}: RegisterUseCaseDependencies): RegisterUseCase {
  return async (params) => {
    const { success, data, error } = parseParamsSchema(params);

    if (!success || data == null) {
      const validationError = error ?? new ValidationError();
      log('error', validationError.message);
      throw validationError;
    }

    const { email, firstName, lastName, password } = data;

    const existingUser = await getUserByEmail({ email });

    if (existingUser != null) {
      const badRequestError = new BadRequestError(
        [],
        'Email is already registered'
      );
      log('error', badRequestError.message);
      throw badRequestError;
    }

    const { hashedPassword } = hashPassword({ password });

    await addUser({ firstName, lastName, email, hashedPassword });
    return;
  };
}

export { registerUseCase, type RegisterUseCase, type RegisterUseCaseParams };
