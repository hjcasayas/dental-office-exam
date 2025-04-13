import { describe } from 'node:test';
import { expect, test, vi } from 'vitest';
import { refreshAuthTokensUseCase } from './refresh-auth-tokens.use-case.js';
import {
  tokens,
  type DeleteTokenByUserIdService,
  type GenerateTokenService,
  type GetTokenByUserIdService,
  type TokenEntity,
  type VerifyTokenService,
} from '../../tokens/index.js';
import type { LoggerService } from '../../utilities/logger/index.js';

describe('Implementing RefreshAuthTokensUseCase dependencies correctly.', () => {
  test('Calling the RefreshAuthTokensUseCase happy path once will call the dependencies once.', async () => {
    let generateRefreshTokenCallCount = 0;
    let deleteTokenByUserIdCallCount = 0;
    let generateAccessTokenCallCount = 0;
    let getTokenByUserIdCallCount = 0;
    let verifyTokenCallCount = 0;
    let loggerCallCount = 0;

    const userIdTestParam: string = 'userIdTestParam';
    const tokenTestParam: string = 'token@123';

    const fakeGenerateRefreshTokenTestResult: TokenEntity = {
      userId: userIdTestParam,
      token: tokenTestParam,
      issuedAt: Date.now(),
      expires: new Date(),
      blacklisted: false,
      type: tokens.refresh,
    };

    const fakeGenerateAccessTokenTestResult: TokenEntity = {
      userId: userIdTestParam,
      token: tokenTestParam,
      issuedAt: Date.now(),
      expires: new Date(),
      blacklisted: false,
      type: tokens.access,
    };

    const fakeVerifyToken: VerifyTokenService = async ({ token }) => {
      verifyTokenCallCount++;
      expect(token).toBe(tokenTestParam);
      return fakeGenerateRefreshTokenTestResult;
    };

    const fakeGetTokenByUserId: GetTokenByUserIdService = async ({
      token,
      userId,
    }) => {
      getTokenByUserIdCallCount++;
      expect(token).toBe(tokenTestParam);
      expect(userId).toBe(userIdTestParam);
      return fakeGenerateRefreshTokenTestResult;
    };

    const fakeDeleteTokenByUserId: DeleteTokenByUserIdService = async ({
      token,
      userId,
    }) => {
      deleteTokenByUserIdCallCount++;
      expect(token).toBe(tokenTestParam);
      expect(userId).toBe(userIdTestParam);
    };

    const fakeGenerateRefreshToken: GenerateTokenService = ({ userId }) => {
      generateRefreshTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return fakeGenerateRefreshTokenTestResult;
    };

    const fakeGenerateAccessToken: GenerateTokenService = ({ userId }) => {
      generateAccessTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return fakeGenerateAccessTokenTestResult;
    };

    const fakeLogger: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('info');
        expect(message).toBe('Successful refresh auth tokens.');
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

    const sut = refreshAuthTokensUseCase({
      verifyToken: fakeVerifyToken,
      getTokenByUserId: fakeGetTokenByUserId,
      deleteTokenByUserId: fakeDeleteTokenByUserId,
      generateRefreshToken: fakeGenerateRefreshToken,
      generateAccessToken: fakeGenerateAccessToken,
      logger: fakeLogger,
    });

    const sutSpy = vi.fn(sut);

    await sutSpy({ token: fakeGenerateRefreshTokenTestResult.token });
    expect(sutSpy).toHaveResolvedTimes(1);
    expect(generateRefreshTokenCallCount).toBe(1);
    expect(generateAccessTokenCallCount).toBe(1);
    expect(deleteTokenByUserIdCallCount).toBe(1);
    expect(getTokenByUserIdCallCount).toBe(1);
    expect(verifyTokenCallCount).toBe(1);
    expect(loggerCallCount).toBe(1);
  });

  test('Calling the RefreshAuthTokensUseCase happy path multiple times will call the dependencies multiple times.', async () => {
    let generateRefreshTokenCallCount = 0;
    let deleteTokenByUserIdCallCount = 0;
    let generateAccessTokenCallCount = 0;
    let getTokenByUserIdCallCount = 0;
    let verifyTokenCallCount = 0;
    let loggerCallCount = 0;

    const userIdTestParam: string = 'userIdTestParam';
    const tokenTestParam: string = 'token@123';

    const fakeGenerateRefreshTokenTestResult: TokenEntity = {
      userId: userIdTestParam,
      token: tokenTestParam,
      issuedAt: Date.now(),
      expires: new Date(),
      blacklisted: false,
      type: tokens.refresh,
    };

    const fakeGenerateAccessTokenTestResult: TokenEntity = {
      userId: userIdTestParam,
      token: tokenTestParam,
      issuedAt: Date.now(),
      expires: new Date(),
      blacklisted: false,
      type: tokens.access,
    };

    const fakeVerifyToken: VerifyTokenService = async ({ token }) => {
      verifyTokenCallCount++;
      expect(token).toBe(tokenTestParam);
      return fakeGenerateRefreshTokenTestResult;
    };

    const fakeGetTokenByUserId: GetTokenByUserIdService = async ({
      token,
      userId,
    }) => {
      getTokenByUserIdCallCount++;
      expect(token).toBe(tokenTestParam);
      expect(userId).toBe(userIdTestParam);
      return fakeGenerateRefreshTokenTestResult;
    };

    const fakeDeleteTokenByUserId: DeleteTokenByUserIdService = async ({
      token,
      userId,
    }) => {
      deleteTokenByUserIdCallCount++;
      expect(token).toBe(tokenTestParam);
      expect(userId).toBe(userIdTestParam);
    };

    const fakeGenerateRefreshToken: GenerateTokenService = ({ userId }) => {
      generateRefreshTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return fakeGenerateRefreshTokenTestResult;
    };

    const fakeGenerateAccessToken: GenerateTokenService = ({ userId }) => {
      generateAccessTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return fakeGenerateAccessTokenTestResult;
    };

    const fakeLogger: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('info');
        expect(message).toBe('Successful refresh auth tokens.');
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

    const sut = refreshAuthTokensUseCase({
      verifyToken: fakeVerifyToken,
      getTokenByUserId: fakeGetTokenByUserId,
      deleteTokenByUserId: fakeDeleteTokenByUserId,
      generateRefreshToken: fakeGenerateRefreshToken,
      generateAccessToken: fakeGenerateAccessToken,
      logger: fakeLogger,
    });

    const sutSpy = vi.fn(sut);

    await sutSpy({ token: fakeGenerateRefreshTokenTestResult.token });
    await sutSpy({ token: fakeGenerateRefreshTokenTestResult.token });
    await sutSpy({ token: fakeGenerateRefreshTokenTestResult.token });
    expect(sutSpy).toHaveResolvedTimes(3);
    expect(generateRefreshTokenCallCount).toBe(3);
    expect(generateAccessTokenCallCount).toBe(3);
    expect(deleteTokenByUserIdCallCount).toBe(3);
    expect(getTokenByUserIdCallCount).toBe(3);
    expect(verifyTokenCallCount).toBe(3);
    expect(loggerCallCount).toBe(3);
  });
});

describe('Refresh token paths', () => {
  test('Unverified token will throw UnauthorizedError.', async () => {
    let generateRefreshTokenCallCount = 0;
    let deleteTokenByUserIdCallCount = 0;
    let generateAccessTokenCallCount = 0;
    let getTokenByUserIdCallCount = 0;
    let verifyTokenCallCount = 0;
    let loggerCallCount = 0;

    const userIdTestParam: string = 'userIdTestParam';
    const tokenTestParam: string = 'token@123';

    const fakeGenerateRefreshTokenTestResult: TokenEntity = {
      userId: userIdTestParam,
      token: tokenTestParam,
      issuedAt: Date.now(),
      expires: new Date(),
      blacklisted: false,
      type: tokens.refresh,
    };

    const fakeGenerateAccessTokenTestResult: TokenEntity = {
      userId: userIdTestParam,
      token: tokenTestParam,
      issuedAt: Date.now(),
      expires: new Date(),
      blacklisted: false,
      type: tokens.access,
    };

    const fakeVerifyToken: VerifyTokenService = async ({ token }) => {
      verifyTokenCallCount++;
      expect(token).toBe(tokenTestParam);
      return null;
    };

    const fakeGetTokenByUserId: GetTokenByUserIdService = async ({
      token,
      userId,
    }) => {
      getTokenByUserIdCallCount++;
      expect(token).toBe(tokenTestParam);
      expect(userId).toBe(userIdTestParam);
      return fakeGenerateRefreshTokenTestResult;
    };

    const fakeDeleteTokenByUserId: DeleteTokenByUserIdService = async ({
      token,
      userId,
    }) => {
      deleteTokenByUserIdCallCount++;
      expect(token).toBe(tokenTestParam);
      expect(userId).toBe(userIdTestParam);
    };

    const fakeGenerateRefreshToken: GenerateTokenService = ({ userId }) => {
      generateRefreshTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return fakeGenerateRefreshTokenTestResult;
    };

    const fakeGenerateAccessToken: GenerateTokenService = ({ userId }) => {
      generateAccessTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return fakeGenerateAccessTokenTestResult;
    };

    const fakeLogger: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('error');
        expect(message).toBe('Invalid token.');
      },
      logAndReturnData(message, data) {
        this.log(
          'info',
          message?.extraData?.trim() != ''
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

    const sut = refreshAuthTokensUseCase({
      verifyToken: fakeVerifyToken,
      getTokenByUserId: fakeGetTokenByUserId,
      deleteTokenByUserId: fakeDeleteTokenByUserId,
      generateRefreshToken: fakeGenerateRefreshToken,
      generateAccessToken: fakeGenerateAccessToken,
      logger: fakeLogger,
    });

    await expect(sut({ token: tokenTestParam })).rejects.toThrowError(
      'Invalid token.'
    );
    expect(generateRefreshTokenCallCount).toBe(0);
    expect(generateAccessTokenCallCount).toBe(0);
    expect(deleteTokenByUserIdCallCount).toBe(0);
    expect(getTokenByUserIdCallCount).toBe(0);
    expect(verifyTokenCallCount).toBe(1);
    expect(loggerCallCount).toBe(1);
  });

  test('Not found token will throw UnauthorizedError.', async () => {
    let generateRefreshTokenCallCount = 0;
    let deleteTokenByUserIdCallCount = 0;
    let generateAccessTokenCallCount = 0;
    let getTokenByUserIdCallCount = 0;
    let verifyTokenCallCount = 0;
    let loggerCallCount = 0;

    const userIdTestParam: string = 'userIdTestParam';
    const tokenTestParam: string = 'token@123';

    const fakeGenerateRefreshTokenTestResult: TokenEntity = {
      userId: userIdTestParam,
      token: tokenTestParam,
      issuedAt: Date.now(),
      expires: new Date(),
      blacklisted: false,
      type: tokens.refresh,
    };

    const fakeGenerateAccessTokenTestResult: TokenEntity = {
      userId: userIdTestParam,
      token: tokenTestParam,
      issuedAt: Date.now(),
      expires: new Date(),
      blacklisted: false,
      type: tokens.access,
    };

    const fakeVerifyToken: VerifyTokenService = async ({ token }) => {
      verifyTokenCallCount++;
      expect(token).toBe(tokenTestParam);
      return fakeGenerateAccessTokenTestResult;
    };

    const fakeGetTokenByUserId: GetTokenByUserIdService = async ({
      token,
      userId,
    }) => {
      getTokenByUserIdCallCount++;
      expect(token).toBe(tokenTestParam);
      expect(userId).toBe(userIdTestParam);
      return null;
    };

    const fakeDeleteTokenByUserId: DeleteTokenByUserIdService = async ({
      token,
      userId,
    }) => {
      deleteTokenByUserIdCallCount++;
      expect(token).toBe(tokenTestParam);
      expect(userId).toBe(userIdTestParam);
    };

    const fakeGenerateRefreshToken: GenerateTokenService = ({ userId }) => {
      generateRefreshTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return fakeGenerateRefreshTokenTestResult;
    };

    const fakeGenerateAccessToken: GenerateTokenService = ({ userId }) => {
      generateAccessTokenCallCount++;
      expect(userId).toBe(userIdTestParam);
      return fakeGenerateAccessTokenTestResult;
    };

    const fakeLogger: LoggerService = {
      log: (level, message) => {
        loggerCallCount++;
        expect(level).toBe('error');
        expect(message).toBe('Token not found.');
      },
      logAndReturnData(message, data) {
        this.log(
          'info',
          message?.extraData?.trim() != ''
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

    const sut = refreshAuthTokensUseCase({
      verifyToken: fakeVerifyToken,
      getTokenByUserId: fakeGetTokenByUserId,
      deleteTokenByUserId: fakeDeleteTokenByUserId,
      generateRefreshToken: fakeGenerateRefreshToken,
      generateAccessToken: fakeGenerateAccessToken,
      logger: fakeLogger,
    });

    await expect(sut({ token: tokenTestParam })).rejects.toThrowError(
      'Token not found.'
    );
    expect(generateRefreshTokenCallCount).toBe(0);
    expect(generateAccessTokenCallCount).toBe(0);
    expect(deleteTokenByUserIdCallCount).toBe(0);
    expect(getTokenByUserIdCallCount).toBe(1);
    expect(verifyTokenCallCount).toBe(1);
    expect(loggerCallCount).toBe(1);
  });
});
