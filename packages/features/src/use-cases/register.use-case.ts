import type { AddUserService, GetUserByEmailService } from '../users/index.js';
import { ValidationError } from '../utilities/errors/validation.error.js';
import type {
  HashPasswordService,
  ParseSchemaService,
} from '../utilities/index.js';

interface RegisterUseCaseParams {
  confirmPassword: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

interface RegisterUseCaseDependencies {
  getUserByEmail: GetUserByEmailService;
  hashPassword: HashPasswordService;
  parseParamsSchema: ParseSchemaService<RegisterUseCaseParams>;
  addUser: AddUserService;
}

type RegisterUseCase = (params: RegisterUseCaseParams) => Promise<void>;

function registerUseCase({
  getUserByEmail,
  hashPassword,
  parseParamsSchema,
  addUser,
}: RegisterUseCaseDependencies): RegisterUseCase {
  return async (params) => {
    const { success, data, error } = parseParamsSchema(params);

    if (!success || data == null) {
      throw error ?? new ValidationError();
    }

    const { email, firstName, lastName, password } = data;

    const existingUser = await getUserByEmail({ email });

    if (existingUser != null) {
      throw new Error('Email is already registered.');
    }

    const { hashedPassword } = hashPassword({ password });

    await addUser({ firstName, lastName, email, hashedPassword });
    return;
  };
}

export { registerUseCase, type RegisterUseCase, type RegisterUseCaseParams };
