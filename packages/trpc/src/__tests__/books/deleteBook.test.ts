import { beforeEach, describe, expect, it } from '@jest/globals';
import { TRPCError } from '@trpc/server';
import { createMockContext, MockContext } from '../../__mocks__/context.mock';
import { Context } from '../../context';
import { trpcRouter } from '../../index';
import { DeleteBookInput } from '../../routes/books/deleteBook';
import { BOOK } from '../../__fixtures__/books.fixture';

describe('@repo/trpc -> Books -> DeleteBook', () => {
    const INPUT: DeleteBookInput = {
        bookId: BOOK.id,
    };
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    it('should delete a book', async () => {
        mockCtx.authorized = true;

        const expectedResult = {
            book: null,
        };

        mockCtx.prisma.book.delete.mockResolvedValue(BOOK);

        const result = await trpcRouter.createCaller(ctx).deleteBook(INPUT);

        expect(result).toEqual(expectedResult);
    });

    it('should throw an exception if the user is not authorized', async () => {
        mockCtx.authorized = false;

        try {
            await trpcRouter.createCaller(ctx).deleteBook(INPUT);
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(TRPCError);
            expect(error.status).toBe('UNAUTHORIZED');
        }
    });

    it('should throw an exception if a books id is not provided', async () => {
        mockCtx.authorized = false;

        try {
            await trpcRouter
                .createCaller(ctx)
                .deleteBook({} as DeleteBookInput);
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(TRPCError);
        }
    });
});
