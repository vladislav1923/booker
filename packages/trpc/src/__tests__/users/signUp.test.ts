import { describe, expect, it, beforeEach } from '@jest/globals';
import { cloneDeep, pick } from 'lodash';
import { trpcRouter } from '../..';
import { User } from '@prisma/client';
import { MockContext, createMockContext } from '../mocks/context.mock';
import { Context } from '../../context';

describe('@repo/trpc -> Users -> Sign Up', () => {
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

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
        const expectedPrismaResponseClone: Partial<User> = pick(
            cloneDeep(expectedPrismaResponse),
            'id',
            'first_name',
            'last_name',
            'email'
        );

        const expectedResult = {
            user: expectedPrismaResponseClone,
        };

        mockCtx.prisma.user.create.mockResolvedValue(expectedPrismaResponse);

        const result = await trpcRouter.createCaller(ctx).signUp(input);

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

        mockCtx.prisma.user.findUnique.mockResolvedValue(
            expectedPrismaResponse
        );

        await expect(
            trpcRouter.createCaller(ctx).signUp(input)
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
            trpcRouter.createCaller(ctx).signUp(input)
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
            trpcRouter.createCaller(ctx).signUp(invalidFirstName)
        ).rejects.toThrowError();

        const invalidLastName = {
            first_name: 'James',
            last_name: 'D',
            email: 'test@google.com',
            password: '123',
            confirm_password: '123',
        };

        await expect(
            trpcRouter.createCaller(ctx).signUp(invalidLastName)
        ).rejects.toThrowError();

        const invalidEmail = {
            first_name: 'James',
            last_name: 'Dalen',
            email: 'test@google',
            password: '123',
            confirm_password: '123',
        };

        await expect(
            trpcRouter.createCaller(ctx).signUp(invalidEmail)
        ).rejects.toThrowError();

        const invalidPassword = {
            first_name: 'James',
            last_name: 'Dalen',
            email: 'test@google',
            password: '1',
            confirm_password: '123',
        };

        await expect(
            trpcRouter.createCaller(ctx).signUp(invalidPassword)
        ).rejects.toThrowError();
    });
});
