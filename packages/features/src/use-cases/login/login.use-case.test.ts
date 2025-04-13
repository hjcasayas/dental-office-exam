import { describe, expect, test, vi } from 'vitest';

import {
  tokens,
  type ComparePasswordService,
  type GenerateTokenService,
  type GetUserByEmailService,
  type LoggerService,
  type SaveTokenService,
  type TokenEntity,
} from '../../index.js';
import { loginUseCase } from './login.use-case.js';

describe('Implementing LoginUsecase dependencies correctly.', () => {
  test('Calling the LoginUsecase happy path once will call the dependencies once.', async () => {
    let getUserByEmailCallCount = 0;
    let generateRefreshTokenCallCount = 0;
    let generateAccessTokenCallCount = 0;
    let loggerCallCount = 0;
    let comparePasswordCallCount = 0;
    let saveTokenCallCount = 0;

    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const hashPasswordTestParam = 'Password@123';
    const passwordTestParam = 'Password@123';
    const userIdTestParam = 'testId';
    const accessTokenEntityTestParam: TokenEntity = {
      token: 'tokenTestParam',
      issuedAt: Date.now(),
      expires: new Date(),
      userId: userIdTestParam,
      type: tokens.access,
    };
    const refreshTokenEntityTestParam: TokenEntity = {
      token: 'tokenTestParam',
      issuedAt: Date.now(),
      expires: new Date(),
      userId: userIdTestParam,
      type: tokens.refresh,
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

    const fakeGenerateRefreshTokenService: GenerateTokenService = ({
      userId,
    }) => {
      generateRefreshTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return refreshTokenEntityTestParam;
    };

    const fakeGenerateAccessTokenService: GenerateTokenService = ({
      userId,
    }) => {
      generateAccessTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return accessTokenEntityTestParam;
    };

    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('info');
        expect(message).toBe(`Successful login: ${emailTestParam}.`);
      },
      logAndReturnData(message, data) {
        this.log(
          'info',
          message.extraData != null && message.extraData.trim() !== ''
            ? `${message.message}: ${message.extraData}.`
            : `${message.message}.`
        );
        return {
          success: true,
          message: message.message,
          data,
        };
      },
      logAndReturnError(error) {
        this.log('error', error.message);
        return error;
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
      expect(tokenEntity).toBe(refreshTokenEntityTestParam);
      return tokenEntity;
    };

    const sut = loginUseCase({
      generateRefreshToken: fakeGenerateRefreshTokenService,
      generateAccessToken: fakeGenerateAccessTokenService,
      comparePassword: fakeComparePasswordService,
      getUserByEmail: fakeGetUserByEmailService,
      saveToken: fakeSaveTokenService,
      logger: fakeLoggerService,
    });

    const sutSpy = vi.fn(sut);
    await sutSpy({
      email: emailTestParam,
      password: passwordTestParam,
    });

    expect(sutSpy).toHaveResolvedTimes(1);
    expect(getUserByEmailCallCount).toBe(1);
    expect(generateAccessTokenCallCount).toBe(1);
    expect(generateRefreshTokenCallCount).toBe(1);
    expect(loggerCallCount).toBe(1);
    expect(comparePasswordCallCount).toBe(1);
    expect(saveTokenCallCount).toBe(1);
  });
  test('Calling the LoginUsecase happy path three times will call the dependencies three times.', async () => {
    let getUserByEmailCallCount = 0;
    let generateRefreshTokenCallCount = 0;
    let generateAccessTokenCallCount = 0;
    let loggerCallCount = 0;
    let comparePasswordCallCount = 0;
    let saveTokenCallCount = 0;

    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const hashPasswordTestParam = 'Password@123';
    const passwordTestParam = 'Password@123';
    const userIdTestParam = 'testId';
    const accessTokenEntityTestParam: TokenEntity = {
      token: 'tokenTestParam',
      issuedAt: Date.now(),
      expires: new Date(),
      userId: userIdTestParam,
      type: tokens.access,
    };

    const refreshTokenEntityTestParam: TokenEntity = {
      token: 'tokenTestParam',
      issuedAt: Date.now(),
      expires: new Date(),
      userId: userIdTestParam,
      type: tokens.refresh,
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

    const fakeGenerateRefreshTokenService: GenerateTokenService = ({
      userId,
    }) => {
      generateRefreshTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return refreshTokenEntityTestParam;
    };

    const fakeGenerateAccessTokenService: GenerateTokenService = ({
      userId,
    }) => {
      generateAccessTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return accessTokenEntityTestParam;
    };

    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('info');
        expect(message).toBe(`Successful login: ${emailTestParam}.`);
      },
      logAndReturnData(message, data) {
        this.log(
          'info',
          message.extraData != null && message.extraData.trim() !== ''
            ? `${message.message}: ${message.extraData}.`
            : `${message.message}.`
        );
        return {
          success: true,
          message: message.message,
          data,
        };
      },
      logAndReturnError(error) {
        this.log('error', error.message);
        return error;
      },
    };

    const fakeSaveTokenService: SaveTokenService = async (
      tokenEntity: TokenEntity
    ) => {
      saveTokenCallCount++;
      expect(tokenEntity).toBe(refreshTokenEntityTestParam);
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
      generateAccessToken: fakeGenerateAccessTokenService,
      generateRefreshToken: fakeGenerateRefreshTokenService,
      comparePassword: fakeComparePasswordService,
      saveToken: fakeSaveTokenService,
      logger: fakeLoggerService,
    });

    const sutSpy = vi.fn(sut);
    await sutSpy({
      email: emailTestParam,
      password: passwordTestParam,
    });
    await sutSpy({
      email: emailTestParam,
      password: passwordTestParam,
    });
    await sutSpy({
      email: emailTestParam,
      password: passwordTestParam,
    });

    expect(sutSpy).toHaveResolvedTimes(3);
    expect(getUserByEmailCallCount).toBe(3);
    expect(generateAccessTokenCallCount).toBe(3);
    expect(generateRefreshTokenCallCount).toBe(3);
    expect(comparePasswordCallCount).toBe(3);
    expect(loggerCallCount).toBe(3);
    expect(saveTokenCallCount).toBe(3);
  });
});

describe('Login paths.', () => {
  test('Unregistered email will throw Bad Request Error.', async () => {
    let getUserByEmailCallCount = 0;
    let generateRefreshTokenCallCount = 0;
    let generateAccessTokenCallCount = 0;
    let loggerCallCount = 0;
    let comparePasswordCallCount = 0;
    let saveTokenCallCount = 0;

    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const hashPasswordTestParam = 'Password@123';
    const passwordTestParam = 'Password@123';
    const userIdTestParam = 'testId';
    const accessTokenEntityTestParam: TokenEntity = {
      token: 'tokenTestParam',
      issuedAt: Date.now(),
      expires: new Date(),
      userId: userIdTestParam,
      type: tokens.access,
    };
    const refreshTokenEntityTestParam: TokenEntity = {
      token: 'tokenTestParam',
      issuedAt: Date.now(),
      expires: new Date(),
      userId: userIdTestParam,
      type: tokens.refresh,
    };

    const fakeGetUserByEmailService: GetUserByEmailService = async ({
      email,
    }) => {
      getUserByEmailCallCount++;
      expect(email).toBe(emailTestParam);
      return null;
    };

    const fakeGenerateRefreshTokenService: GenerateTokenService = ({
      userId,
    }) => {
      generateRefreshTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return refreshTokenEntityTestParam;
    };

    const fakeGenerateAccessTokenService: GenerateTokenService = ({
      userId,
    }) => {
      generateAccessTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return accessTokenEntityTestParam;
    };

    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('error');
        expect(message).toMatch(/Bad Request/);
      },
      logAndReturnData(message, data) {
        this.log(
          'info',
          message.extraData != null && message.extraData.trim() !== ''
            ? `${message.message}: ${message.extraData}.`
            : `${message.message}.`
        );
        return {
          success: true,
          message: message.message,
          data,
        };
      },
      logAndReturnError(error) {
        this.log('error', error.message);
        return error;
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
      expect(tokenEntity).toBe(refreshTokenEntityTestParam);
      return tokenEntity;
    };

    const sut = loginUseCase({
      getUserByEmail: fakeGetUserByEmailService,
      generateAccessToken: fakeGenerateAccessTokenService,
      generateRefreshToken: fakeGenerateRefreshTokenService,
      comparePassword: fakeComparePasswordService,
      saveToken: fakeSaveTokenService,
      logger: fakeLoggerService,
    });

    await expect(
      sut({ email: emailTestParam, password: passwordTestParam })
    ).rejects.toThrowError('Email and/or password is incorrect.');
    expect(getUserByEmailCallCount).toBe(1);
    expect(loggerCallCount).toBe(1);
    expect(generateAccessTokenCallCount).toBe(0);
    expect(generateRefreshTokenCallCount).toBe(0);
    expect(comparePasswordCallCount).toBe(0);
    expect(saveTokenCallCount).toBe(0);
  });
  test('Wrong  password will throw Bad Request Error.', async () => {
    let getUserByEmailCallCount = 0;
    let generateRefreshTokenCallCount = 0;
    let generateAccessTokenCallCount = 0;
    let loggerCallCount = 0;
    let comparePasswordCallCount = 0;
    let saveTokenCallCount = 0;

    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const hashPasswordTestParam = 'Password@123';
    const passwordTestParam = 'Password@123';
    const userIdTestParam = 'testId';
    const accessTokenEntityTestParam: TokenEntity = {
      token: 'tokenTestParam',
      issuedAt: Date.now(),
      expires: new Date(),
      userId: userIdTestParam,
      type: tokens.access,
    };
    const refreshTokenEntityTestParam: TokenEntity = {
      token: 'tokenTestParam',
      issuedAt: Date.now(),
      expires: new Date(),
      userId: userIdTestParam,
      type: tokens.refresh,
    };

    const fakeGetUserByEmailService: GetUserByEmailService = async ({
      email,
    }) => {
      getUserByEmailCallCount++;
      expect(email).toBe(emailTestParam);
      return null;
    };

    const fakeGenerateRefreshTokenService: GenerateTokenService = ({
      userId,
    }) => {
      generateRefreshTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return refreshTokenEntityTestParam;
    };

    const fakeGenerateAccessTokenService: GenerateTokenService = ({
      userId,
    }) => {
      generateAccessTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return accessTokenEntityTestParam;
    };

    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('error');
        expect(message).toMatch(/Bad Request/);
      },
      logAndReturnData(message, data) {
        this.log(
          'info',
          message.extraData != null && message.extraData.trim() !== ''
            ? `${message.message}: ${message.extraData}.`
            : `${message.message}.`
        );
        return {
          success: true,
          message: message.message,
          data,
        };
      },
      logAndReturnError(error) {
        this.log('error', error.message);
        return error;
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
      expect(tokenEntity).toBe(refreshTokenEntityTestParam);
      return tokenEntity;
    };

    const sut = loginUseCase({
      getUserByEmail: fakeGetUserByEmailService,
      generateAccessToken: fakeGenerateAccessTokenService,
      generateRefreshToken: fakeGenerateRefreshTokenService,
      comparePassword: fakeComparePasswordService,
      saveToken: fakeSaveTokenService,
      logger: fakeLoggerService,
    });

    await expect(
      sut({ email: emailTestParam, password: passwordTestParam })
    ).rejects.toThrowError('Email and/or password is incorrect');
    expect(getUserByEmailCallCount).toBe(1);
    expect(loggerCallCount).toBe(1);
    expect(generateAccessTokenCallCount).toBe(0);
    expect(generateRefreshTokenCallCount).toBe(0);
    expect(comparePasswordCallCount).toBe(0);
    expect(saveTokenCallCount).toBe(0);
  });
  test('Login succeeds.', async () => {
    let getUserByEmailCallCount = 0;
    let generateRefreshTokenCallCount = 0;
    let generateAccessTokenCallCount = 0;
    let loggerCallCount = 0;
    let comparePasswordCallCount = 0;
    let saveTokenCallCount = 0;

    const emailTestParam = 'henlyjade.casayas@gmail.com';
    const hashPasswordTestParam = 'Password@123';
    const passwordTestParam = 'Password@123';
    const userIdTestParam = 'testId';
    const accessTokenEntityTestParam: TokenEntity = {
      token: 'tokenTestParam',
      issuedAt: Date.now(),
      expires: new Date(),
      userId: userIdTestParam,
      type: tokens.access,
    };
    const refreshTokenEntityTestParam: TokenEntity = {
      token: 'tokenTestParam',
      issuedAt: Date.now(),
      expires: new Date(),
      userId: userIdTestParam,
      type: tokens.refresh,
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

    const fakeGenerateRefreshTokenService: GenerateTokenService = ({
      userId,
    }) => {
      generateRefreshTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return refreshTokenEntityTestParam;
    };

    const fakeGenerateAccessTokenService: GenerateTokenService = ({
      userId,
    }) => {
      generateAccessTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return accessTokenEntityTestParam;
    };

    const fakeLoggerService: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('info');
        expect(message).toBe(`Successful login: ${emailTestParam}.`);
      },
      logAndReturnData(message, data) {
        this.log(
          'info',
          message.extraData != null && message.extraData.trim() !== ''
            ? `${message.message}: ${message.extraData}.`
            : `${message.message}.`
        );
        return {
          success: true,
          message: message.message,
          data,
        };
      },
      logAndReturnError(error) {
        this.log('error', error.message);
        return error;
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
      expect(tokenEntity).toBe(refreshTokenEntityTestParam);
      return tokenEntity;
    };

    const sut = loginUseCase({
      getUserByEmail: fakeGetUserByEmailService,
      generateAccessToken: fakeGenerateAccessTokenService,
      generateRefreshToken: fakeGenerateRefreshTokenService,
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
    expect(generateAccessTokenCallCount).toBe(1);
    expect(generateRefreshTokenCallCount).toBe(1);
    expect(comparePasswordCallCount).toBe(1);
    expect(loggerCallCount).toBe(1);
    expect(saveTokenCallCount).toBe(1);
  });
});
