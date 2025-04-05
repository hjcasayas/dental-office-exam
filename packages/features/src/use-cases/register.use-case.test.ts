import { describe, expect, test, vi } from 'vitest';
import {
  registerUseCase,
  type RegisterUseCaseParams,
} from './register.use-case.js';
import { type AddUserService } from '../users/add-user.service.js';
import { type GetUserByEmailService } from '../users/get-user-by-email.service.js';
import {
  ValidationError,
  type HashPasswordService,
  type ParseSchemaService,
} from '../utilities/index.js';

describe('Implementing dependencies correctly', () => {
  test('Calling the RegisterUseCase happy path once will call the dependencies once', async () => {
    let addUserCallCount = 0;
    let getUserByEmailCallCount = 0;
    let hashPasswordCallCount = 0;
    let parseRegisterParamsCallCount = 0;

    const firstNameTestParam = 'Henly Jade';
    const lastNameTestParam = 'Casayas';
    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const passwordTestParam = 'Password@123';
    const confirmPasswordTestParam = 'Password@123';

    const fakeAddUserService: AddUserService = async ({
      email,
      firstName,
      lastName,
    }) => {
      addUserCallCount++;
      expect(email).toBe(emailTestParam);
      expect(firstName).toBe(firstNameTestParam);
      expect(lastName).toBe(lastNameTestParam);
    };

    const fakeGetUserByEmailService: GetUserByEmailService = async ({
      email,
    }) => {
      getUserByEmailCallCount++;
      expect(email).toBe(emailTestParam);
      return null;
    };

    const fakeHashPasswordService: HashPasswordService = ({ password }) => {
      hashPasswordCallCount++;
      expect(password).toBe(passwordTestParam);
      return { hashedPassword: '' };
    };

    const fakeParseRegisterUseCaseParams: ParseSchemaService<
      RegisterUseCaseParams
    > = ({ firstName, lastName, email, password, confirmPassword }) => {
      parseRegisterParamsCallCount++;
      expect(email).toBe(emailTestParam);
      expect(firstName).toBe(firstNameTestParam);
      expect(lastName).toBe(lastNameTestParam);
      expect(password).toBe(passwordTestParam);
      expect(confirmPassword).toBe(confirmPasswordTestParam);

      return {
        success: true,
        data: { firstName, lastName, email, password, confirmPassword },
        error: null,
      };
    };

    const sut = registerUseCase({
      addUser: fakeAddUserService,
      getUserByEmail: fakeGetUserByEmailService,
      hashPassword: fakeHashPasswordService,
      parseParamsSchema: fakeParseRegisterUseCaseParams,
    });

    await sut({
      firstName: firstNameTestParam,
      lastName: lastNameTestParam,
      email: emailTestParam,
      password: passwordTestParam,
      confirmPassword: confirmPasswordTestParam,
    });

    expect(addUserCallCount).toBe(1);
    expect(getUserByEmailCallCount).toBe(1);
    expect(hashPasswordCallCount).toBe(1);
    expect(parseRegisterParamsCallCount).toBe(1);
  });

  test('Calling the RegisterUseCase happy path three times will call the dependencies three times', async () => {
    let addUserCallCount = 0;
    let getUserByEmailCallCount = 0;
    let hashPasswordCallCount = 0;
    let parseRegisterParamsCallCount = 0;

    const firstNameTestParam = 'Henly Jade';
    const lastNameTestParam = 'Casayas';
    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const passwordTestParam = 'Password@123';
    const confirmPasswordTestParam = 'Password@123';

    const fakeAddUserService: AddUserService = async ({
      email,
      firstName,
      lastName,
    }) => {
      addUserCallCount++;
      expect(email).toBe(emailTestParam);
      expect(firstName).toBe(firstNameTestParam);
      expect(lastName).toBe(lastNameTestParam);
    };

    const fakeGetUserByEmailService: GetUserByEmailService = async ({
      email,
    }) => {
      getUserByEmailCallCount++;
      expect(email).toBe(emailTestParam);
      return null;
    };

    const fakeHashPasswordService: HashPasswordService = ({ password }) => {
      hashPasswordCallCount++;
      expect(password).toBe(passwordTestParam);
      return { hashedPassword: '' };
    };

    const fakeParseRegisterUseCaseParams: ParseSchemaService<
      RegisterUseCaseParams
    > = ({ firstName, lastName, email, password, confirmPassword }) => {
      parseRegisterParamsCallCount++;
      expect(email).toBe(emailTestParam);
      expect(firstName).toBe(firstNameTestParam);
      expect(lastName).toBe(lastNameTestParam);
      expect(password).toBe(passwordTestParam);
      expect(confirmPassword).toBe(confirmPasswordTestParam);

      return {
        success: true,
        data: { firstName, lastName, email, password, confirmPassword },
        error: null,
      };
    };

    const sut = registerUseCase({
      addUser: fakeAddUserService,
      getUserByEmail: fakeGetUserByEmailService,
      hashPassword: fakeHashPasswordService,
      parseParamsSchema: fakeParseRegisterUseCaseParams,
    });

    await sut({
      firstName: firstNameTestParam,
      lastName: lastNameTestParam,
      email: emailTestParam,
      password: passwordTestParam,
      confirmPassword: confirmPasswordTestParam,
    });

    await sut({
      firstName: firstNameTestParam,
      lastName: lastNameTestParam,
      email: emailTestParam,
      password: passwordTestParam,
      confirmPassword: confirmPasswordTestParam,
    });

    await sut({
      firstName: firstNameTestParam,
      lastName: lastNameTestParam,
      email: emailTestParam,
      password: passwordTestParam,
      confirmPassword: confirmPasswordTestParam,
    });

    expect(addUserCallCount).toBe(3);
    expect(getUserByEmailCallCount).toBe(3);
    expect(hashPasswordCallCount).toBe(3);
    expect(parseRegisterParamsCallCount).toBe(3);
  });
});

describe('Adding User', () => {
  test('Throw error when user exists', async () => {
    const firstNameTestParam = 'Henly Jade';
    const lastNameTestParam = 'Casayas';
    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const passwordTestParam = 'Password@123';
    const confirmPasswordTestParam = 'Password@123';

    const fakeAddUserService: AddUserService = async ({
      email,
      firstName,
      lastName,
    }) => {
      expect(email).toBe(emailTestParam);
      expect(firstName).toBe(firstNameTestParam);
      expect(lastName).toBe(lastNameTestParam);
    };

    const fakeGetUserByEmailService: GetUserByEmailService = async ({
      email,
    }) => {
      expect(email).toBe(emailTestParam);
      return {
        firstName: firstNameTestParam,
        lastName: lastNameTestParam,
        email: emailTestParam,
      };
    };

    const fakeHashPasswordService: HashPasswordService = ({ password }) => {
      expect(password).toBe(passwordTestParam);
      return { hashedPassword: '' };
    };

    const fakeParseRegisterUseCaseParams: ParseSchemaService<
      RegisterUseCaseParams
    > = ({ firstName, lastName, email, password, confirmPassword }) => {
      expect(email).toBe(emailTestParam);
      expect(firstName).toBe(firstNameTestParam);
      expect(lastName).toBe(lastNameTestParam);
      expect(password).toBe(passwordTestParam);
      expect(confirmPassword).toBe(confirmPasswordTestParam);

      return {
        success: true,
        data: { firstName, lastName, email, password, confirmPassword },
        error: null,
      };
    };

    const sut = registerUseCase({
      addUser: fakeAddUserService,
      getUserByEmail: fakeGetUserByEmailService,
      hashPassword: fakeHashPasswordService,
      parseParamsSchema: fakeParseRegisterUseCaseParams,
    });

    await expect(async () =>
      sut({
        firstName: firstNameTestParam,
        lastName: lastNameTestParam,
        email: emailTestParam,
        password: passwordTestParam,
        confirmPassword: confirmPasswordTestParam,
      })
    ).rejects.toThrowError();
  });

  test('Throw validation error when inputs are invalid', async () => {
    const firstNameTestParam = 'Henly Jade';
    const lastNameTestParam = 'Casayas';
    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const passwordTestParam = 'Password@123';
    const confirmPasswordTestParam = 'Password@123';

    const fakeAddUserService: AddUserService = async ({
      email,
      firstName,
      lastName,
    }) => {
      expect(email).toBe(emailTestParam);
      expect(firstName).toBe(firstNameTestParam);
      expect(lastName).toBe(lastNameTestParam);
    };

    const fakeGetUserByEmailService: GetUserByEmailService = async ({
      email,
    }) => {
      expect(email).toBe(emailTestParam);
      return {
        firstName: firstNameTestParam,
        lastName: lastNameTestParam,
        email: emailTestParam,
      };
    };

    const fakeHashPasswordService: HashPasswordService = ({ password }) => {
      expect(password).toBe(passwordTestParam);
      return { hashedPassword: '' };
    };

    const fakeParseRegisterUseCaseParams: ParseSchemaService<
      RegisterUseCaseParams
    > = ({ firstName, lastName, email, password, confirmPassword }) => {
      expect(email).toBe(emailTestParam);
      expect(firstName).toBe(firstNameTestParam);
      expect(lastName).toBe(lastNameTestParam);
      expect(password).toBe(passwordTestParam);
      expect(confirmPassword).toBe(confirmPasswordTestParam);

      return {
        success: false,
        data: null,
        error: new ValidationError(),
      };
    };

    const sut = registerUseCase({
      addUser: fakeAddUserService,
      getUserByEmail: fakeGetUserByEmailService,
      hashPassword: fakeHashPasswordService,
      parseParamsSchema: fakeParseRegisterUseCaseParams,
    });

    await expect(async () =>
      sut({
        firstName: firstNameTestParam,
        lastName: lastNameTestParam,
        email: emailTestParam,
        password: passwordTestParam,
        confirmPassword: confirmPasswordTestParam,
      })
    ).rejects.toThrowError();
  });

  test('Adding user succeeds', async () => {
    const firstNameTestParam = 'Henly Jade';
    const lastNameTestParam = 'Casayas';
    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const passwordTestParam = 'Password@123';
    const confirmPasswordTestParam = 'Password@123';

    const fakeAddUserService: AddUserService = async ({
      email,
      firstName,
      lastName,
    }) => {
      expect(email).toBe(emailTestParam);
      expect(firstName).toBe(firstNameTestParam);
      expect(lastName).toBe(lastNameTestParam);
    };

    const fakeGetUserByEmailService: GetUserByEmailService = async ({
      email,
    }) => {
      expect(email).toBe(emailTestParam);
      return null;
    };

    const fakeHashPasswordService: HashPasswordService = ({ password }) => {
      expect(password).toBe(passwordTestParam);
      return { hashedPassword: '' };
    };

    const fakeParseRegisterUseCaseParams: ParseSchemaService<
      RegisterUseCaseParams
    > = ({ firstName, lastName, email, password, confirmPassword }) => {
      expect(email).toBe(emailTestParam);
      expect(firstName).toBe(firstNameTestParam);
      expect(lastName).toBe(lastNameTestParam);
      expect(password).toBe(passwordTestParam);
      expect(confirmPassword).toBe(confirmPasswordTestParam);

      return {
        success: true,
        data: { firstName, lastName, email, password, confirmPassword },
        error: null,
      };
    };

    const sut = registerUseCase({
      addUser: fakeAddUserService,
      getUserByEmail: fakeGetUserByEmailService,
      hashPassword: fakeHashPasswordService,
      parseParamsSchema: fakeParseRegisterUseCaseParams,
    });

    const sutSpy = vi.fn(sut);

    await sutSpy({
      firstName: firstNameTestParam,
      lastName: lastNameTestParam,
      email: emailTestParam,
      password: passwordTestParam,
      confirmPassword: confirmPasswordTestParam,
    });

    expect(sutSpy).toHaveResolved();
  });
});
