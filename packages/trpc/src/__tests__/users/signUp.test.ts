import { beforeEach, describe, expect, it } from '@jest/globals';
import { trpcRouter } from '../..';
import { createMockContext, MockContext } from '../../__mocks__/context.mock';
import { Context } from '../../context';
import { BadRequestError, Errors } from '../../errors';
import {
    PASSWORD,
    USER,
    USER_RESPONSE,
    WRONG_PASSWORD,
} from '../../__fixtures__/users.fixture';
import { SignUpInput } from '../../routes/users/signUp';

describe('@repo/trpc -> Users -> Sign Up', () => {
    const INPUT: SignUpInput = {
        firstName: USER.firstName,
        lastName: USER.lastName,
        email: USER.email,
        password: PASSWORD,
        confirmPassword: PASSWORD,
    };
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    it('should create a new user', async () => {
        const expectedResult = {
            user: USER_RESPONSE,
        };

        mockCtx.prisma.user.create.mockResolvedValue(USER);

        const result = await trpcRouter.createCaller(ctx).signUp(INPUT);

        expect(result).toEqual(expectedResult);
    });

    it('should throw an error if user already exists', async () => {
        mockCtx.prisma.user.findUnique.mockResolvedValue(USER);

        try {
            await trpcRouter.createCaller(ctx).signUp(INPUT);
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(BadRequestError);
            expect(error.status).toBe(Errors.UserAlreadyExists);
        }
    });

    it('should throw an error if password and confirm password do not match', async () => {
        try {
            await trpcRouter.createCaller(ctx).signUp({
                ...INPUT,
                confirmPassword: WRONG_PASSWORD,
            });
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(BadRequestError);
            expect(error.status).toBe(Errors.PasswordsDoNotMatch);
        }
    });

    it('should throw an error if input is not valid', async () => {
        await expect(
            trpcRouter.createCaller(ctx).signUp({
                ...INPUT,
                firstName: 'J',
            })
        ).rejects.toThrowError();

        await expect(
            trpcRouter.createCaller(ctx).signUp({
                ...INPUT,
                lastName: 'D',
            })
        ).rejects.toThrowError();

        await expect(
            trpcRouter.createCaller(ctx).signUp({
                ...INPUT,
                email: 'test@google',
            })
        ).rejects.toThrowError();

        await expect(
            trpcRouter.createCaller(ctx).signUp({
                ...INPUT,
                password: '123',
            })
        ).rejects.toThrowError();
    });
});
