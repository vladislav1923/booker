import { beforeEach, describe, expect, it } from '@jest/globals';
import { TRPCError } from '@trpc/server';
import { createMockContext, MockContext } from '../../__mocks__/context.mock';
import { Context } from '../../context';
import { trpcRouter } from '../../index';
import { USER } from '../../__fixtures__/users.fixture';
import { UpdateBookInput } from '../../routes/books/updateBook';
import { BOOK } from '../../__fixtures__/books.fixture';

describe('@repo/trpc -> Books -> UpdateBook', () => {
    const INPUT: UpdateBookInput = {
        bookId: BOOK.id,
        title: BOOK.title,
        authorId: BOOK.authorId,
        languageId: BOOK.languageId,
        statusId: BOOK.statusId,
    };
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    it('should update a book', async () => {
        mockCtx.authorized = true;
        mockCtx.user = USER;

        const expectedResult = {
            book: BOOK,
        };

        mockCtx.prisma.book.update.mockResolvedValue(BOOK);

        const result = await trpcRouter.createCaller(ctx).updateBook(INPUT);

        expect(result).toEqual(expectedResult);
    });

    it('should throw an exception if the user is not authorized', async () => {
        mockCtx.authorized = false;

        try {
            await trpcRouter.createCaller(ctx).updateBook(INPUT);
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(TRPCError);
            expect(error.code).toBe('UNAUTHORIZED');
        }
    });

    it('should throw an exception if an books id is not provided', async () => {
        mockCtx.authorized = false;

        try {
            await trpcRouter
                .createCaller(ctx)
                .updateBook({} as UpdateBookInput);
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(TRPCError);
        }
    });
});
