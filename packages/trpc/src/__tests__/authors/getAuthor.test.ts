import { beforeEach, describe, expect, it } from '@jest/globals';
import { TRPCError } from '@trpc/server';
import { createMockContext, MockContext } from '../../__mocks__/context.mock';
import { Context } from '../../context';
import { trpcRouter } from '../../index';
import { AUTHOR } from '../../__fixtures__/authors.fixture';
import { GetAuthorInput } from '../../routes/authors/getAuthor';

describe('@repo/trpc -> Authors -> GetAuthor', () => {
    const INPUT: GetAuthorInput = { authorId: AUTHOR.id };
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    it('should return an author', async () => {
        mockCtx.authorized = true;

        const expectedResult = {
            author: AUTHOR,
        };

        mockCtx.prisma.author.findUnique.mockResolvedValue(AUTHOR);

        const result = await trpcRouter.createCaller(ctx).getAuthor(INPUT);

        expect(result).toEqual(expectedResult);
    });

    it('should throw an exception if the user is not authorized', async () => {
        mockCtx.authorized = false;

        try {
            await trpcRouter.createCaller(ctx).getAuthor(INPUT);
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(TRPCError);
            expect(error.code).toBe('UNAUTHORIZED');
        }
    });

    it('should throw an exception if an authors id is not provided', async () => {
        mockCtx.authorized = false;

        try {
            await trpcRouter.createCaller(ctx).getAuthor({} as GetAuthorInput);
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(TRPCError);
        }
    });
});
