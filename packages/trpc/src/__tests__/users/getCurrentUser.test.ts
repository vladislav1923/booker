import { beforeEach, describe, expect, it } from '@jest/globals';
import { createMockContext, MockContext } from '../../__mocks__/context.mock';
import { Context } from '../../context';
import { trpcRouter } from '../../index';
import { Errors, ForbiddenError } from '../../errors';
import { USER, USER_RESPONSE } from '../../__fixtures__/users.fixture';

describe('@repo/trpc -> Users -> GetCurrentUser', () => {
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    it('should return the current user', async () => {
        mockCtx.authorized = true;
        mockCtx.user = USER;

        const expectedResult = {
            user: USER_RESPONSE,
        };

        mockCtx.prisma.user.findUnique.mockResolvedValue(USER);

        const result = await trpcRouter.createCaller(ctx).getCurrentUser();

        expect(result).toEqual(expectedResult);
    });

    it('should throw an exception if the user is not authorized', async () => {
        mockCtx.authorized = false;

        try {
            await trpcRouter.createCaller(ctx).getCurrentUser();
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(ForbiddenError);
            expect(error.status).toBe(Errors.NotAuthorized);
        }
    });
});
