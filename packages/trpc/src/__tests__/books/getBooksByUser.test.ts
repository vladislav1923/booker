import { beforeEach, describe, expect, it } from '@jest/globals';
import { createMockContext, MockContext } from '../../__mocks__/context.mock';
import { Context } from '../../context';
import { trpcRouter } from '../../index';
import { USER } from '../../__fixtures__/users.fixture';
import { BOOK } from '../../__fixtures__/books.fixture';
import { TRPCError } from '@trpc/server';

describe('@repo/trpc -> Books -> GetBooksByUser', () => {
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    it('should return books', async () => {
        mockCtx.authorized = true;
        mockCtx.user = USER;

        const expectedResult = {
            books: [BOOK],
        };

        mockCtx.prisma.book.findMany.mockResolvedValue([BOOK]);

        const result = await trpcRouter.createCaller(ctx).getBooksByUser();

        expect(result).toEqual(expectedResult);
    });

    it('should throw an exception if the user is not authorized', async () => {
        mockCtx.authorized = false;

        try {
            await trpcRouter.createCaller(ctx).getBooksByUser();
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(TRPCError);
            expect(error.code).toBe('UNAUTHORIZED');
        }
    });
});
