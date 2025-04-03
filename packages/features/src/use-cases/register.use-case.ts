import type { AddUserService } from '../users/add-user.service.js';
import type { GetUserByEmailService } from '../users/get-user-by-email.service.js';

interface RegisterUseCaseParams {
  firstName: string;
  lastName: string;
  email: string;
}

interface RegisterUseCaseDependencies {
  getUserByEmailService: GetUserByEmailService;
  // validationService: ValidationService;
  addUserService: AddUserService;
}

type RegisterUseCase = (params: RegisterUseCaseParams) => Promise<void>;

const registerUseCase =
  ({
    getUserByEmailService,
    // validationService,
    addUserService,
  }: RegisterUseCaseDependencies): RegisterUseCase =>
  async ({ firstName, lastName, email }) => {
    // validate the inputs

    const existingUser = await getUserByEmailService({ email });

    if (existingUser != null) {
      throw new Error('Email is already registered.');
    }

    await addUserService({ firstName, lastName, email });
    return;
  };

export { registerUseCase, type RegisterUseCase };
