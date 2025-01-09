import { beforeEach, describe, expect, it } from '@jest/globals';
import { createMockContext, MockContext } from '../../__mocks__/context.mock';
import { Context } from '../../context';
import { trpcRouter } from '../../index';
import { Errors, ForbiddenError } from '../../errors';

describe('@repo/trpc -> Users -> Logout', () => {
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    it('should logout the current user', async () => {
        const expectedResult = {
            user: null,
        };

        mockCtx.authorized = true;

        const result = await trpcRouter.createCaller(ctx).logout();

        expect(mockCtx.res.clearCookie).toHaveBeenCalledWith('token');
        expect(result).toEqual(expectedResult);
    });

    it('should throw an exception if the user is not authorized', async () => {
        mockCtx.authorized = false;

        try {
            await trpcRouter.createCaller(ctx).logout();
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(ForbiddenError);
            expect(error.status).toBe(Errors.NotAuthorized);
        }
    });
});
