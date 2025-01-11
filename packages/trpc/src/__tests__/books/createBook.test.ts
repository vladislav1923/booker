import { beforeEach, describe, expect, it } from '@jest/globals';
import { TRPCError } from '@trpc/server';
import { createMockContext, MockContext } from '../../__mocks__/context.mock';
import { Context } from '../../context';
import { trpcRouter } from '../../index';
import { Errors, ForbiddenError } from '../../errors';
import { USER } from '../../__fixtures__/users.fixture';
import { CreateBookInput } from '../../routes/books/createBook';
import { BOOK } from '../../__fixtures__/books.fixture';

describe('@repo/trpc -> Books -> CreateBook', () => {
    const INPUT: CreateBookInput = {
        title: BOOK.title,
        authorId: BOOK.authorId,
        statusId: BOOK.statusId,
        languageId: BOOK.languageId,
    };
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    it('should create a new book', async () => {
        mockCtx.authorized = true;
        mockCtx.user = USER;

        const expectedResult = {
            book: BOOK,
        };

        mockCtx.prisma.book.create.mockResolvedValue(BOOK);

        const result = await trpcRouter.createCaller(ctx).createBook(INPUT);

        expect(result).toEqual(expectedResult);
    });

    it('should throw an exception if the user is not authorized', async () => {
        mockCtx.authorized = false;

        try {
            await trpcRouter.createCaller(ctx).createBook(INPUT);
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(ForbiddenError);
            expect(error.status).toBe(Errors.NotAuthorized);
        }
    });

    it('should throw an exception if input data is not provided', async () => {
        mockCtx.authorized = false;

        try {
            await trpcRouter
                .createCaller(ctx)
                .createBook({} as CreateBookInput);
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(TRPCError);
        }
    });
});
