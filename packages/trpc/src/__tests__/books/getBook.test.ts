import { beforeEach, describe, expect, it } from '@jest/globals';
import { TRPCError } from '@trpc/server';
import { createMockContext, MockContext } from '../../__mocks__/context.mock';
import { Context } from '../../context';
import { trpcRouter } from '../../index';
import { Errors, ForbiddenError } from '../../errors';
import { GetBookInput } from '../../routes/books/getBook';
import { BOOK } from '../../__fixtures__/books.fixture';

describe('@repo/trpc -> Books -> GetBook', () => {
    const INPUT: GetBookInput = { bookId: BOOK.id };
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    it('should return a book', async () => {
        mockCtx.authorized = true;

        const expectedResult = {
            book: BOOK,
        };

        mockCtx.prisma.book.findUnique.mockResolvedValue(BOOK);

        const result = await trpcRouter.createCaller(ctx).getBook(INPUT);

        expect(result).toEqual(expectedResult);
    });

    it('should throw an exception if the user is not authorized', async () => {
        mockCtx.authorized = false;

        try {
            await trpcRouter.createCaller(ctx).getBook(INPUT);
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(ForbiddenError);
            expect(error.status).toBe(Errors.NotAuthorized);
        }
    });

    it('should throw an exception if an books id is not provided', async () => {
        mockCtx.authorized = false;

        try {
            await trpcRouter.createCaller(ctx).getBook({} as GetBookInput);
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(TRPCError);
        }
    });
});
