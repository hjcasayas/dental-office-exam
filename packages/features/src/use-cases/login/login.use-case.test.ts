import { describe, expect, test, vi } from 'vitest';
import {
  BadRequestError,
  type GenerateAuthTokenService,
  type GetUserByEmailAndPasswordService,
  type LoggerService,
} from '../../index.js';
import { loginUseCase } from './login.use-case.js';

describe('Implementing LoginUsecase dependencies correctly.', () => {
  test('Calling the RegisterUseCase happy path once will call the dependencies once.', async () => {
    let getUserByEmailAndPasswordCallCount = 0;
    let generateAuthTokenCallCount = 0;
    let loggerCallCount = 0;
    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const passwordTestParam = 'Password@123';
    const userIdTestParam = 'testId';
    const fakeGetUserByEmailAndPasswordService: GetUserByEmailAndPasswordService =
      async ({ email, password }) => {
        getUserByEmailAndPasswordCallCount++;
        expect(email).toBe(emailTestParam);
        expect(password).toBe(passwordTestParam);
        return {
          id: userIdTestParam,
          firstName: 'Test First Name',
          lastName: 'Test Last Name',
          email,
        };
      };
    const fakeGenerateAuthTokenService: GenerateAuthTokenService = ({
      userId,
    }) => {
      generateAuthTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return { token: '' };
    };
    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('info');
        expect(message).toBe(`Successful login: ${emailTestParam}`);
      },
    };
    const sut = loginUseCase({
      getUserByEmailAndPassword: fakeGetUserByEmailAndPasswordService,
      generateAuthToken: fakeGenerateAuthTokenService,
      logger: fakeLoggerService,
    });
    await sut({
      email: emailTestParam,
      password: passwordTestParam,
    });
    expect(getUserByEmailAndPasswordCallCount).toBe(1);
    expect(generateAuthTokenCallCount).toBe(1);
    expect(loggerCallCount).toBe(1);
  });
  test('Calling the RegisterUseCase happy path three times will call the dependencies three times.', async () => {
    let getUserByEmailAndPasswordCallCount = 0;
    let generateAuthTokenCallCount = 0;
    let loggerCallCount = 0;
    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const passwordTestParam = 'Password@123';
    const userIdTestParam = 'testId';
    const fakeGetUserByEmailAndPasswordService: GetUserByEmailAndPasswordService =
      async ({ email, password }) => {
        getUserByEmailAndPasswordCallCount++;
        expect(email).toBe(emailTestParam);
        expect(password).toBe(passwordTestParam);
        return {
          id: userIdTestParam,
          firstName: 'Test First Name',
          lastName: 'Test Last Name',
          email,
        };
      };
    const fakeGenerateAuthTokenService: GenerateAuthTokenService = ({
      userId,
    }) => {
      generateAuthTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return { token: '' };
    };
    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('info');
        expect(message).toBe(`Successful login: ${emailTestParam}`);
      },
    };
    const sut = loginUseCase({
      getUserByEmailAndPassword: fakeGetUserByEmailAndPasswordService,
      generateAuthToken: fakeGenerateAuthTokenService,
      logger: fakeLoggerService,
    });
    await sut({
      email: emailTestParam,
      password: passwordTestParam,
    });
    await sut({
      email: emailTestParam,
      password: passwordTestParam,
    });
    await sut({
      email: emailTestParam,
      password: passwordTestParam,
    });
    expect(getUserByEmailAndPasswordCallCount).toBe(3);
    expect(generateAuthTokenCallCount).toBe(3);
    expect(loggerCallCount).toBe(3);
  });
});

describe('Login paths.', () => {
  test('Wrong email and/or password will throw Bad Request Error.', async () => {
    let getUserByEmailAndPasswordCallCount = 0;
    let generateAuthTokenCallCount = 0;
    let loggerCallCount = 0;
    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const passwordTestParam = 'Password@123';
    const userIdTestParam = 'testId';
    const fakeGetUserByEmailAndPasswordService: GetUserByEmailAndPasswordService =
      async ({ email, password }) => {
        getUserByEmailAndPasswordCallCount++;
        expect(email).toBe(emailTestParam);
        expect(password).toBe(passwordTestParam);
        return null;
      };
    const fakeGenerateAuthTokenService: GenerateAuthTokenService = ({
      userId,
    }) => {
      generateAuthTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return { token: '' };
    };
    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('info');
        expect(message).toBe(`Successful login: ${emailTestParam}`);
      },
    };
    const sut = loginUseCase({
      getUserByEmailAndPassword: fakeGetUserByEmailAndPasswordService,
      generateAuthToken: fakeGenerateAuthTokenService,
      logger: fakeLoggerService,
    });
    await expect(
      sut({ email: emailTestParam, password: passwordTestParam })
    ).rejects.toThrowError(BadRequestError);
    expect(getUserByEmailAndPasswordCallCount).toBe(1);
    expect(loggerCallCount).toBe(0);
    expect(generateAuthTokenCallCount).toBe(0);
  });
  test('Login succeeds.', async () => {
    let getUserByEmailAndPasswordCallCount = 0;
    let generateAuthTokenCallCount = 0;
    let loggerCallCount = 0;
    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const passwordTestParam = 'Password@123';
    const userIdTestParam = 'testId';

    const fakeGetUserByEmailAndPasswordService: GetUserByEmailAndPasswordService =
      async ({ email, password }) => {
        getUserByEmailAndPasswordCallCount++;
        expect(email).toBe(emailTestParam);
        expect(password).toBe(passwordTestParam);

        return {
          id: userIdTestParam,
          firstName: 'Test First Name',
          lastName: 'Test Last Name',
          email,
        };
      };

    const fakeGenerateAuthTokenService: GenerateAuthTokenService = ({
      userId,
    }) => {
      generateAuthTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return { token: '' };
    };

    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('info');
        expect(message).toBe(`Successful login: ${emailTestParam}`);
      },
    };
    const sut = loginUseCase({
      getUserByEmailAndPassword: fakeGetUserByEmailAndPasswordService,
      generateAuthToken: fakeGenerateAuthTokenService,
      logger: fakeLoggerService,
    });
    const sutSpy = vi.fn(sut);
    await sutSpy({
      email: emailTestParam,
      password: passwordTestParam,
    });
    expect(sutSpy).toHaveResolved();
    expect(getUserByEmailAndPasswordCallCount).toBe(1);
    expect(generateAuthTokenCallCount).toBe(1);
    expect(loggerCallCount).toBe(1);
  });
});
