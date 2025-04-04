import type { AddUserService, GetUserByEmailService } from '../users/index.js';
import type {
  HashPasswordService,
  ParseSchemaServiceResult,
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
  parseSchema: ParseRegisterUseCaseParams;
  addUser: AddUserService;
}

type ParseRegisterUseCaseParams = (
  params: RegisterUseCaseParams
) => ParseSchemaServiceResult<RegisterUseCaseParams, Error>;

type RegisterUseCase = (params: RegisterUseCaseParams) => Promise<void>;

function registerUseCase({
  getUserByEmail,
  hashPassword,
  parseSchema,
  addUser,
}: RegisterUseCaseDependencies): RegisterUseCase {
  return async ({ firstName, lastName, email, password, confirmPassword }) => {
    const { success, data } = parseSchema({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    if (!success || data == null) {
      throw new Error('Validation error.');
    }

    const existingUser = await getUserByEmail({ email });

    if (existingUser != null) {
      throw new Error('Email is already registered.');
    }

    const { hashedPassword } = hashPassword({ password: data.password });

    await addUser({ firstName, lastName, email, hashedPassword });
    return;
  };
}

export {
  registerUseCase,
  type RegisterUseCase,
  type ParseRegisterUseCaseParams,
};
