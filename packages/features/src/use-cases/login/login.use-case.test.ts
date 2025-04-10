import { describe, expect, test, vi } from 'vitest';

import {
  tokens,
  type ComparePasswordService,
  type GenerateAuthTokenService,
  type GetUserByEmailService,
  type LoggerService,
  type SaveTokenService,
  type TokenEntity,
} from '../../index.js';
import { loginUseCase } from './login.use-case.js';

describe('Implementing LoginUsecase dependencies correctly.', () => {
  test('Calling the RegisterUseCase happy path once will call the dependencies once.', async () => {
    let getUserByEmailCallCount = 0;
    let generateAuthTokenCallCount = 0;
    let loggerCallCount = 0;
    let comparePasswordCallCount = 0;
    let saveTokenCallCount = 0;

    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const hashPasswordTestParam = 'Password@123';
    const passwordTestParam = 'Password@123';
    const userIdTestParam = 'testId';
    const tokenEntityTestParam: TokenEntity = {
      token: 'tokenTestParam',
      issuedAt: Date.now(),
      expires: new Date(),
      userId: userIdTestParam,
      type: tokens.access,
    };

    const fakeGetUserByEmailService: GetUserByEmailService = async ({
      email,
    }) => {
      getUserByEmailCallCount++;
      expect(email).toBe(emailTestParam);
      return {
        id: userIdTestParam,
        firstName: '',
        lastName: '',
        hashedPassword: hashPasswordTestParam,
        email,
      };
    };
    const fakeGenerateAuthTokenService: GenerateAuthTokenService = ({
      userId,
    }) => {
      generateAuthTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return tokenEntityTestParam;
    };

    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('info');
        expect(message).toBe(`Successful login: ${emailTestParam}`);
      },
    };

    const fakeComparePasswordService: ComparePasswordService = async ({
      password,
      hashedPassword,
    }) => {
      comparePasswordCallCount++;
      expect(password).toBe(passwordTestParam);
      expect(hashedPassword).toBe(hashPasswordTestParam);
      return true;
    };

    const fakeSaveTokenService: SaveTokenService = async (
      tokenEntity: TokenEntity
    ) => {
      saveTokenCallCount++;
      expect(tokenEntity).toBe(tokenEntityTestParam);
      return tokenEntity;
    };

    const sut = loginUseCase({
      generateRefreshToken: fakeGenerateAuthTokenService,
      generateAccessToken: fakeGenerateAuthTokenService,
      comparePassword: fakeComparePasswordService,
      getUserByEmail: fakeGetUserByEmailService,
      saveToken: fakeSaveTokenService,
      logger: fakeLoggerService,
    });
    await sut({
      email: emailTestParam,
      password: passwordTestParam,
    });
    expect(getUserByEmailCallCount).toBe(1);
    expect(generateAuthTokenCallCount).toBe(2);
    expect(loggerCallCount).toBe(1);
    expect(comparePasswordCallCount).toBe(1);
    expect(saveTokenCallCount).toBe(1);
  });
  test('Calling the RegisterUseCase happy path three times will call the dependencies three times.', async () => {
    let getUserByEmailCallCount = 0;
    let generateAuthTokenCallCount = 0;
    let loggerCallCount = 0;
    let comparePasswordCallCount = 0;
    let saveTokenCallCount = 0;

    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const hashPasswordTestParam = 'Password@123';
    const passwordTestParam = 'Password@123';
    const userIdTestParam = 'testId';
    const tokenEntityTestParam: TokenEntity = {
      token: 'tokenTestParam',
      issuedAt: Date.now(),
      expires: new Date(),
      userId: userIdTestParam,
      type: tokens.access,
    };

    const fakeGetUserByEmailService: GetUserByEmailService = async ({
      email,
    }) => {
      getUserByEmailCallCount++;
      expect(email).toBe(emailTestParam);
      return {
        id: userIdTestParam,
        firstName: '',
        lastName: '',
        hashedPassword: hashPasswordTestParam,
        email,
      };
    };

    const fakeGenerateAuthTokenService: GenerateAuthTokenService = ({
      userId,
    }) => {
      generateAuthTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return tokenEntityTestParam;
    };

    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('info');
        expect(message).toBe(`Successful login: ${emailTestParam}`);
      },
    };

    const fakeSaveTokenService: SaveTokenService = async (
      tokenEntity: TokenEntity
    ) => {
      saveTokenCallCount++;
      expect(tokenEntity).toBe(tokenEntityTestParam);
      return tokenEntity;
    };

    const fakeComparePasswordService: ComparePasswordService = async ({
      password,
      hashedPassword,
    }) => {
      comparePasswordCallCount++;
      expect(password).toBe(passwordTestParam);
      expect(hashedPassword).toBe(hashPasswordTestParam);
      return true;
    };

    const sut = loginUseCase({
      getUserByEmail: fakeGetUserByEmailService,
      generateAccessToken: fakeGenerateAuthTokenService,
      generateRefreshToken: fakeGenerateAuthTokenService,
      comparePassword: fakeComparePasswordService,
      saveToken: fakeSaveTokenService,
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

    expect(getUserByEmailCallCount).toBe(3);
    expect(generateAuthTokenCallCount).toBe(6);
    expect(comparePasswordCallCount).toBe(3);
    expect(loggerCallCount).toBe(3);
    expect(saveTokenCallCount).toBe(3);
  });
});

describe('Login paths.', () => {
  test('Unregistered email will throw Bad Request Error.', async () => {
    let getUserByEmailCallCount = 0;
    let generateAuthTokenCallCount = 0;
    let loggerCallCount = 0;
    let comparePasswordCallCount = 0;
    let saveTokenCallCount = 0;

    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const hashPasswordTestParam = 'Password@123';
    const passwordTestParam = 'Password@123';
    const userIdTestParam = 'testId';
    const tokenEntityTestParam: TokenEntity = {
      token: 'tokenTestParam',
      issuedAt: Date.now(),
      expires: new Date(),
      userId: userIdTestParam,
      type: tokens.access,
    };

    const fakeGetUserByEmailService: GetUserByEmailService = async ({
      email,
    }) => {
      getUserByEmailCallCount++;
      expect(email).toBe(emailTestParam);
      return null;
    };

    const fakeGenerateAuthTokenService: GenerateAuthTokenService = ({
      userId,
    }) => {
      generateAuthTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return {
        token: '',
        issuedAt: Date.now(),
        expires: new Date(),
        userId,
        type: tokens.access,
      };
    };

    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('error');
        expect(message).toMatch(/Bad Request/);
      },
    };

    const fakeComparePasswordService: ComparePasswordService = async ({
      password,
      hashedPassword,
    }) => {
      comparePasswordCallCount++;
      expect(password).toBe(passwordTestParam);
      expect(hashedPassword).toBe(hashPasswordTestParam);
      return true;
    };

    const fakeSaveTokenService: SaveTokenService = async (
      tokenEntity: TokenEntity
    ) => {
      saveTokenCallCount++;
      expect(tokenEntity).toBe(tokenEntityTestParam);
      return tokenEntity;
    };

    const sut = loginUseCase({
      getUserByEmail: fakeGetUserByEmailService,
      generateAccessToken: fakeGenerateAuthTokenService,
      generateRefreshToken: fakeGenerateAuthTokenService,
      comparePassword: fakeComparePasswordService,
      saveToken: fakeSaveTokenService,
      logger: fakeLoggerService,
    });

    await expect(
      sut({ email: emailTestParam, password: passwordTestParam })
    ).rejects.toThrowError('Email and/or password is incorrect');
    expect(getUserByEmailCallCount).toBe(1);
    expect(loggerCallCount).toBe(1);
    expect(generateAuthTokenCallCount).toBe(0);
    expect(comparePasswordCallCount).toBe(0);
    expect(saveTokenCallCount).toBe(0);
  });
  test('Wrong  password will throw Bad Request Error.', async () => {
    let getUserByEmailCallCount = 0;
    let generateAuthTokenCallCount = 0;
    let loggerCallCount = 0;
    let comparePasswordCallCount = 0;
    let saveTokenCallCount = 0;

    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const hashPasswordTestParam = 'Password@123';
    const passwordTestParam = 'Password@123';
    const userIdTestParam = 'testId';
    const tokenEntityTestParam: TokenEntity = {
      token: 'tokenTestParam',
      issuedAt: Date.now(),
      expires: new Date(),
      userId: userIdTestParam,
      type: tokens.access,
    };

    const fakeGetUserByEmailService: GetUserByEmailService = async ({
      email,
    }) => {
      getUserByEmailCallCount++;
      expect(email).toBe(emailTestParam);
      return null;
    };

    const fakeGenerateAuthTokenService: GenerateAuthTokenService = ({
      userId,
    }) => {
      generateAuthTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return {
        token: '',
        issuedAt: Date.now(),
        expires: new Date(),
        userId,
        type: tokens.access,
      };
    };

    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('error');
        expect(message).toMatch(/Bad Request/);
      },
    };

    const fakeComparePasswordService: ComparePasswordService = async ({
      password,
      hashedPassword,
    }) => {
      comparePasswordCallCount++;
      expect(password).toBe(passwordTestParam);
      expect(hashedPassword).toBe(hashPasswordTestParam);
      return false;
    };

    const fakeSaveTokenService: SaveTokenService = async (
      tokenEntity: TokenEntity
    ) => {
      saveTokenCallCount++;
      expect(tokenEntity).toBe(tokenEntityTestParam);
      return tokenEntity;
    };

    const sut = loginUseCase({
      getUserByEmail: fakeGetUserByEmailService,
      generateAccessToken: fakeGenerateAuthTokenService,
      generateRefreshToken: fakeGenerateAuthTokenService,
      comparePassword: fakeComparePasswordService,
      saveToken: fakeSaveTokenService,
      logger: fakeLoggerService,
    });

    await expect(
      sut({ email: emailTestParam, password: passwordTestParam })
    ).rejects.toThrowError('Email and/or password is incorrect');
    expect(getUserByEmailCallCount).toBe(1);
    expect(loggerCallCount).toBe(1);
    expect(generateAuthTokenCallCount).toBe(0);
    expect(comparePasswordCallCount).toBe(0);
    expect(saveTokenCallCount).toBe(0);
  });
  test('Login succeeds.', async () => {
    let getUserByEmailCallCount = 0;
    let generateAuthTokenCallCount = 0;
    let loggerCallCount = 0;
    let comparePasswordCallCount = 0;
    let saveTokenCallCount = 0;

    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const hashPasswordTestParam = 'Password@123';
    const passwordTestParam = 'Password@123';
    const userIdTestParam = 'testId';
    const tokenEntityTestParam: TokenEntity = {
      token: 'tokenTestParam',
      issuedAt: Date.now(),
      expires: new Date(),
      userId: userIdTestParam,
      type: tokens.access,
    };

    const fakeGetUserByEmailService: GetUserByEmailService = async ({
      email,
    }) => {
      getUserByEmailCallCount++;
      expect(email).toBe(emailTestParam);

      return {
        id: userIdTestParam,
        firstName: 'Test First Name',
        lastName: 'Test Last Name',
        hashedPassword: hashPasswordTestParam,
        email,
      };
    };

    const fakeGenerateAuthTokenService: GenerateAuthTokenService = ({
      userId,
    }) => {
      generateAuthTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return tokenEntityTestParam;
    };

    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('info');
        expect(message).toBe(`Successful login: ${emailTestParam}`);
      },
    };

    const fakeComparePasswordService: ComparePasswordService = async ({
      password,
      hashedPassword,
    }) => {
      comparePasswordCallCount++;
      expect(password).toBe(passwordTestParam);
      expect(hashedPassword).toBe(hashPasswordTestParam);
      return true;
    };

    const fakeSaveTokenService: SaveTokenService = async (
      tokenEntity: TokenEntity
    ) => {
      saveTokenCallCount++;
      expect(tokenEntity).toBe(tokenEntityTestParam);
      return tokenEntity;
    };

    const sut = loginUseCase({
      getUserByEmail: fakeGetUserByEmailService,
      generateAccessToken: fakeGenerateAuthTokenService,
      generateRefreshToken: fakeGenerateAuthTokenService,
      comparePassword: fakeComparePasswordService,
      saveToken: fakeSaveTokenService,
      logger: fakeLoggerService,
    });
    const sutSpy = vi.fn(sut);
    await sutSpy({
      email: emailTestParam,
      password: passwordTestParam,
    });
    expect(sutSpy).toHaveResolved();
    expect(getUserByEmailCallCount).toBe(1);
    expect(generateAuthTokenCallCount).toBe(2);
    expect(comparePasswordCallCount).toBe(1);
    expect(loggerCallCount).toBe(1);
    expect(saveTokenCallCount).toBe(1);
  });
});
