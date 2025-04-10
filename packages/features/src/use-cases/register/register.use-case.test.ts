import { describe, expect, test, vi } from 'vitest';
import {
  registerUseCase,
  type RegisterUseCaseParams,
} from './register.use-case.js';
import type {
  AddUserService,
  IsEmailAlreadyTakenService,
} from '../../users/index.js';

import { type HashPasswordService } from '../../utilities/password/index.js';
import { type ParseSchemaService } from '../../utilities/schema/index.js';

import { type LoggerService } from '../../utilities/logger/index.js';

describe('Implementing dependencies correctly', () => {
  test('Calling the RegisterUseCase happy path once will call the dependencies once', async () => {
    let addUserCallCount = 0;
    let isEmailAlreadyTakenCallCount = 0;
    let hashPasswordCallCount = 0;
    let parseRegisterParamsCallCount = 0;
    let loggerCallCount = 0;

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

    const fakeIsEmailAlreadyTakenService: IsEmailAlreadyTakenService = async ({
      email,
    }) => {
      isEmailAlreadyTakenCallCount++;
      expect(email).toBe(emailTestParam);
      return false;
    };

    const fakeHashPasswordService: HashPasswordService = async ({
      password,
    }) => {
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

    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('info');
        expect(message).toBe(
          `Successfully registered user with email: ${emailTestParam}.`
        );
      },
    };

    const sut = registerUseCase({
      addUser: fakeAddUserService,
      isEmailAlreadyTaken: fakeIsEmailAlreadyTakenService,
      hashPassword: fakeHashPasswordService,
      parseParamsSchema: fakeParseRegisterUseCaseParams,
      logger: fakeLoggerService,
    });

    await sut({
      firstName: firstNameTestParam,
      lastName: lastNameTestParam,
      email: emailTestParam,
      password: passwordTestParam,
      confirmPassword: confirmPasswordTestParam,
    });

    expect(addUserCallCount).toBe(1);
    expect(isEmailAlreadyTakenCallCount).toBe(1);
    expect(hashPasswordCallCount).toBe(1);
    expect(parseRegisterParamsCallCount).toBe(1);
    expect(loggerCallCount).toBe(1);
  });

  test('Calling the RegisterUseCase happy path three times will call the dependencies three times', async () => {
    let addUserCallCount = 0;
    let isEmailAlreadyTakenCallCount = 0;
    let hashPasswordCallCount = 0;
    let parseRegisterParamsCallCount = 0;
    let loggerCallCount = 0;

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

    const fakeIsEmailAlreadyTakenService: IsEmailAlreadyTakenService = async ({
      email,
    }) => {
      isEmailAlreadyTakenCallCount++;
      expect(email).toBe(emailTestParam);
      return false;
    };

    const fakeHashPasswordService: HashPasswordService = async ({
      password,
    }) => {
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

    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('info');
        expect(message).toBe(
          `Successfully registered user with email: ${emailTestParam}.`
        );
      },
    };

    const sut = registerUseCase({
      addUser: fakeAddUserService,
      isEmailAlreadyTaken: fakeIsEmailAlreadyTakenService,
      hashPassword: fakeHashPasswordService,
      parseParamsSchema: fakeParseRegisterUseCaseParams,
      logger: fakeLoggerService,
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
    expect(isEmailAlreadyTakenCallCount).toBe(3);
    expect(hashPasswordCallCount).toBe(3);
    expect(parseRegisterParamsCallCount).toBe(3);
    expect(loggerCallCount).toBe(3);
  });
});

describe('Adding User', () => {
  test('Throw validation error when inputs are invalid', async () => {
    const firstNameTestParam = 'Henly Jade';
    const lastNameTestParam = 'Casayas';
    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const passwordTestParam = 'Password@123';
    const confirmPasswordTestParam = 'Password@123';

    let addUserCallCount = 0;
    let isEmailAlreadyTakenCallCount = 0;
    let hashPasswordCallCount = 0;
    let parseRegisterParamsCallCount = 0;
    let loggerCallCount = 0;

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

    const fakeIsEmailAlreadyTakenService: IsEmailAlreadyTakenService = async ({
      email,
    }) => {
      isEmailAlreadyTakenCallCount++;
      expect(email).toBe(emailTestParam);
      return false;
    };

    const fakeHashPasswordService: HashPasswordService = async ({
      password,
    }) => {
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
        success: false,
        errors: [{ message: 'Validation error' }],
      };
    };

    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('error');
        expect(message).toBe('Validation error');
      },
    };

    const sut = registerUseCase({
      addUser: fakeAddUserService,
      isEmailAlreadyTaken: fakeIsEmailAlreadyTakenService,
      hashPassword: fakeHashPasswordService,
      parseParamsSchema: fakeParseRegisterUseCaseParams,
      logger: fakeLoggerService,
    });

    await expect(
      sut({
        firstName: firstNameTestParam,
        lastName: lastNameTestParam,
        email: emailTestParam,
        password: passwordTestParam,
        confirmPassword: confirmPasswordTestParam,
      })
    ).rejects.toThrowError('Validation error');
    expect(addUserCallCount).toBe(0);
    expect(isEmailAlreadyTakenCallCount).toBe(0);
    expect(hashPasswordCallCount).toBe(0);
    expect(parseRegisterParamsCallCount).toBe(1);
    expect(loggerCallCount).toBe(1);
  });

  test('Throw error when email already registered', async () => {
    const firstNameTestParam = 'Henly Jade';
    const lastNameTestParam = 'Casayas';
    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const passwordTestParam = 'Password@123';
    const confirmPasswordTestParam = 'Password@123';

    let addUserCallCount = 0;
    let isEmailAlreadyTakenCallCount = 0;
    let hashPasswordCallCount = 0;
    let parseRegisterParamsCallCount = 0;
    let loggerCallCount = 0;

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

    const fakeIsEmailAlreadyTakenService: IsEmailAlreadyTakenService = async ({
      email,
    }) => {
      isEmailAlreadyTakenCallCount++;
      expect(email).toBe(emailTestParam);
      return true;
    };

    const fakeHashPasswordService: HashPasswordService = async ({
      password,
    }) => {
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

    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('error');
        expect(message).toBe('Email is already registered');
      },
    };

    const sut = registerUseCase({
      addUser: fakeAddUserService,
      isEmailAlreadyTaken: fakeIsEmailAlreadyTakenService,
      hashPassword: fakeHashPasswordService,
      parseParamsSchema: fakeParseRegisterUseCaseParams,
      logger: fakeLoggerService,
    });

    await expect(
      sut({
        firstName: firstNameTestParam,
        lastName: lastNameTestParam,
        email: emailTestParam,
        password: passwordTestParam,
        confirmPassword: confirmPasswordTestParam,
      })
    ).rejects.toThrowError('Bad Request');
    expect(addUserCallCount).toBe(0);
    expect(isEmailAlreadyTakenCallCount).toBe(1);
    expect(hashPasswordCallCount).toBe(0);
    expect(parseRegisterParamsCallCount).toBe(1);
    expect(loggerCallCount).toBe(1);
  });

  test('Successful registration', async () => {
    const firstNameTestParam = 'Henly Jade';
    const lastNameTestParam = 'Casayas';
    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const passwordTestParam = 'Password@123';
    const confirmPasswordTestParam = 'Password@123';

    let loggerCallCount = 0;

    const fakeAddUserService: AddUserService = async ({
      email,
      firstName,
      lastName,
    }) => {
      expect(email).toBe(emailTestParam);
      expect(firstName).toBe(firstNameTestParam);
      expect(lastName).toBe(lastNameTestParam);
    };

    const fakeIsEmailAlreadyTakenService: IsEmailAlreadyTakenService = async ({
      email,
    }) => {
      expect(email).toBe(emailTestParam);
      return false;
    };

    const fakeHashPasswordService: HashPasswordService = async ({
      password,
    }) => {
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

    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('info');
        expect(message).toBe(
          `Successfully registered user with email: ${emailTestParam}.`
        );
      },
    };

    const sut = registerUseCase({
      addUser: fakeAddUserService,
      isEmailAlreadyTaken: fakeIsEmailAlreadyTakenService,
      hashPassword: fakeHashPasswordService,
      parseParamsSchema: fakeParseRegisterUseCaseParams,
      logger: fakeLoggerService,
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
    expect(loggerCallCount).toBe(1);
  });
});
