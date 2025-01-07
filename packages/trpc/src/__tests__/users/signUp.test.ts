import { describe, expect, it } from '@jest/globals';
import { cloneDeep } from 'lodash';
import { prismaMock } from '../mocks/prisma.mock';
import { trpcRouter } from '../..';
import { User } from '@prisma/client';

describe('@repo/trpc -> Users -> Sign Up', () => {
    it('should create a new user', async () => {
        const input = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'test@google.com',
            password: '12345678',
            confirm_password: '12345678',
        };
        const expectedPrismaResponse: User = {
            id: '1',
            first_name: 'John',
            last_name: 'Doe',
            email: 'test@google.com',
            password_digest: 'egi8o-yrpnm-4y8n4-8y4n8-4y8n4',
            created_at: new Date(),
            updated_at: new Date(),
        };
        const expectedPrismaResponseClone: Partial<User> = cloneDeep(
            expectedPrismaResponse
        );

        delete expectedPrismaResponseClone.password_digest;

        const expectedResult = {
            user: expectedPrismaResponseClone,
        };

        prismaMock.user.create.mockResolvedValue(expectedPrismaResponse);

        const result = await trpcRouter.createCaller({}).signUp(input);

        expect(result).toEqual(expectedResult);
    });

    it('should throw an error if user already exists', async () => {
        const input = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'test@google.com',
            password: '12345678',
            confirm_password: '12345678',
        };

        const expectedPrismaResponse: User = {
            id: '1',
            first_name: 'John',
            last_name: 'Doe',
            email: 'test@google.com',
            password_digest: 'egi8o-yrpnm-4y8n4-8y4n8-4y8n4',
            created_at: new Date(),
            updated_at: new Date(),
        };

        prismaMock.user.findUnique.mockResolvedValue(expectedPrismaResponse);

        await expect(
            trpcRouter.createCaller({}).signUp(input)
        ).rejects.toThrowError('User already exists');
    });

    it('should throw an error if password and confirm password do not match', async () => {
        const input = {
            first_name: 'John',
            last_name: 'Doe',
            email: 'test@google.com',
            password: '12345678',
            confirm_password: '87654321',
        };

        await expect(
            trpcRouter.createCaller({}).signUp(input)
        ).rejects.toThrowError('Passwords do not match');
    });

    it('should throw an error if input is not valid', async () => {
        const invalidFirstName = {
            first_name: 'J',
            last_name: 'Dalen',
            email: 'test@google.com',
            password: '123',
            confirm_password: '123',
        };

        await expect(
            trpcRouter.createCaller({}).signUp(invalidFirstName)
        ).rejects.toThrowError();

        const invalidLastName = {
            first_name: 'James',
            last_name: 'D',
            email: 'test@google.com',
            password: '123',
            confirm_password: '123',
        };

        await expect(
            trpcRouter.createCaller({}).signUp(invalidLastName)
        ).rejects.toThrowError();

        const invalidEmail = {
            first_name: 'James',
            last_name: 'Dalen',
            email: 'test@google',
            password: '123',
            confirm_password: '123',
        };

        await expect(
            trpcRouter.createCaller({}).signUp(invalidEmail)
        ).rejects.toThrowError();

        const invalidPassword = {
            first_name: 'James',
            last_name: 'Dalen',
            email: 'test@google',
            password: '1',
            confirm_password: '123',
        };

        await expect(
            trpcRouter.createCaller({}).signUp(invalidPassword)
        ).rejects.toThrowError();
    });
});
