import { describe, expect, test, vi } from 'vitest';
import { registerUseCase } from './register.use-case.js';
import { type AddUserService } from '../users/add-user.service.js';
import { type GetUserByEmailService } from '../users/get-user-by-email.service.js';

describe('Implementing dependencies correctly', () => {
  test('Calling the RegisterUseCase once will call the AddUserService and GetUserByEmailService once', async () => {
    let addUserServiceCallCount = 0;
    let getUserByEmailCallCount = 0;

    const firstNameTestParam = 'Henly Jade';
    const lastNameTestParam = 'Casayas';
    const emailTestParam = 'henlyjade.casayas@gmail.com';

    const fakeAddUserService: AddUserService = async ({
      email,
      firstName,
      lastName,
    }) => {
      addUserServiceCallCount++;
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

    const sut = registerUseCase({
      addUserService: fakeAddUserService,
      getUserByEmailService: fakeGetUserByEmailService,
    });

    await sut({
      firstName: firstNameTestParam,
      lastName: lastNameTestParam,
      email: emailTestParam,
    });

    expect(addUserServiceCallCount).toBe(1);
    expect(getUserByEmailCallCount).toBe(1);
  });

  test('Calling the RegisterUseCase three times will call the AddUserService and GetUserByEmailService three times', async () => {
    let addUserServiceCallCount = 0;
    let getUserByEmailCallCount = 0;

    const firstNameTestParam = 'Henly Jade';
    const lastNameTestParam = 'Casayas';
    const emailTestParam = 'henlyjade.casayas@gmail.com';

    const fakeAddUserService: AddUserService = async ({
      email,
      firstName,
      lastName,
    }) => {
      addUserServiceCallCount++;
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

    const sut = registerUseCase({
      addUserService: fakeAddUserService,
      getUserByEmailService: fakeGetUserByEmailService,
    });

    await sut({
      firstName: firstNameTestParam,
      lastName: lastNameTestParam,
      email: emailTestParam,
    });

    await sut({
      firstName: firstNameTestParam,
      lastName: lastNameTestParam,
      email: emailTestParam,
    });

    await sut({
      firstName: firstNameTestParam,
      lastName: lastNameTestParam,
      email: emailTestParam,
    });

    expect(addUserServiceCallCount).toBe(3);
    expect(getUserByEmailCallCount).toBe(3);
  });
});

describe('Adding User', () => {
  test('Throw error when user exists', async () => {
    const firstNameTestParam = 'Henly Jade';
    const lastNameTestParam = 'Casayas';
    const emailTestParam = 'henlyjade.casayas@gmail.com';

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

    const sut = registerUseCase({
      addUserService: fakeAddUserService,
      getUserByEmailService: fakeGetUserByEmailService,
    });

    await expect(async () =>
      sut({
        firstName: firstNameTestParam,
        lastName: lastNameTestParam,
        email: emailTestParam,
      })
    ).rejects.toThrowError('Email is already registered.');
  });
  test('Does not throw error when user does not exist', async () => {
    const firstNameTestParam = 'Henly Jade';
    const lastNameTestParam = 'Casayas';
    const emailTestParam = 'henlyjade.casayas@gmail.com';

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

    const sut = registerUseCase({
      addUserService: fakeAddUserService,
      getUserByEmailService: fakeGetUserByEmailService,
    });

    const sutSpy = vi.fn(sut);

    await sutSpy({
      firstName: firstNameTestParam,
      lastName: lastNameTestParam,
      email: emailTestParam,
    });

    expect(sutSpy).toHaveResolved();
  });
});
