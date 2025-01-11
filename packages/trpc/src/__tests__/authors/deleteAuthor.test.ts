import { beforeEach, describe, expect, it } from '@jest/globals';
import { TRPCError } from '@trpc/server';
import { createMockContext, MockContext } from '../../__mocks__/context.mock';
import { Context } from '../../context';
import { trpcRouter } from '../../index';
import { Errors, ForbiddenError } from '../../errors';
import { AUTHOR } from '../../__fixtures__/authors.fixture';
import { DeleteAuthorInput } from '../../routes/authors/deleteAuthor';

describe('@repo/trpc -> Authors -> DeleteAuthor', () => {
    const INPUT: DeleteAuthorInput = {
        authorId: AUTHOR.id,
    };
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    it('should delete a author', async () => {
        mockCtx.authorized = true;

        const expectedResult = {
            author: null,
        };

        mockCtx.prisma.author.delete.mockResolvedValue(AUTHOR);

        const result = await trpcRouter.createCaller(ctx).deleteAuthor(INPUT);

        expect(result).toEqual(expectedResult);
    });

    it('should throw an exception if the user is not authorized', async () => {
        mockCtx.authorized = false;

        try {
            await trpcRouter.createCaller(ctx).deleteAuthor(INPUT);
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(ForbiddenError);
            expect(error.status).toBe(Errors.NotAuthorized);
        }
    });

    it('should throw an exception if an authors id is not provided', async () => {
        mockCtx.authorized = false;

        try {
            await trpcRouter
                .createCaller(ctx)
                .deleteAuthor({} as DeleteAuthorInput);
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(TRPCError);
        }
    });
});
