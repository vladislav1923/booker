import { beforeEach, describe, expect, it } from '@jest/globals';
import { createMockContext, MockContext } from '../../__mocks__/context.mock';
import { Context } from '../../context';
import { trpcRouter } from '../../index';
import {
    JWT_TOKEN,
    PASSWORD,
    USER,
    USER_RESPONSE,
    WRONG_PASSWORD_DIGEST,
} from '../../__fixtures__/users.fixture';
import { BadRequestError, Errors } from '../../errors';

describe('@repo/trpc -> Users -> Login', () => {
    const INPUT = {
        email: USER.email,
        password: PASSWORD,
    };
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    it('should login a user', async () => {
        const expectedResult = {
            user: USER_RESPONSE,
        };

        mockCtx.prisma.user.findUnique.mockResolvedValue(USER);

        const result = await trpcRouter.createCaller(ctx).login(INPUT);

        expect(mockCtx.res.cookie).toHaveBeenCalledWith('token', JWT_TOKEN, {
            expires: expect.any(Date),
        });
        expect(result).toEqual(expectedResult);
    });

    it('should throw an error if the user is not found', async () => {
        mockCtx.prisma.user.findUnique.mockResolvedValue(null);

        try {
            await trpcRouter.createCaller(ctx).login(INPUT);
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(BadRequestError);
            expect(error.status).toBe(Errors.UserNotFound);
        }
    });

    it('should throw an error if the password is incorrect', async () => {
        mockCtx.prisma.user.findUnique.mockResolvedValue({
            ...USER,
            password_digest: WRONG_PASSWORD_DIGEST,
        });

        try {
            await trpcRouter.createCaller(ctx).login(INPUT);
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(BadRequestError);
            expect(error.status).toBe(Errors.IncorrectEmailOrPassword);
        }
    });
});
