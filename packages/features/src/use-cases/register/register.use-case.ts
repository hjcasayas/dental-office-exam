import type {
  AddUserService,
  IsEmailAlreadyTakenService,
} from '../../users/index.js';
import { ValidationError } from '../../utilities/errors/validation.error.js';
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

type RegisterUseCase = (params: RegisterUseCaseParams) => Promise<void>;

function registerUseCase({
  parseParamsSchema,
  isEmailAlreadyTaken,
  hashPassword,
  addUser,
  logger,
}: RegisterUseCaseDependencies): RegisterUseCase {
  return async (params) => {
    const { success, data, error } = parseParamsSchema(params);

    if (!success || data == null) {
      const validationError = error ?? new ValidationError();
      throw validationError;
    }

    const { email, firstName, lastName, password } = data;

    const isTaken = await isEmailAlreadyTaken({ email });

    if (isTaken) {
      const badRequestError = new BadRequestError([
        { message: `Email is already registered: ${email}`, field: 'email' },
      ]);
      throw badRequestError;
    }

    const { hashedPassword } = await hashPassword({ password });

    await addUser({ firstName, lastName, email, hashedPassword });
    logger.log('info', `Successfully registered user with email: ${email}.`);
    return;
  };
}

export { registerUseCase, type RegisterUseCase, type RegisterUseCaseParams };
