import { beforeEach, describe, expect, it } from '@jest/globals';
import { TRPCError } from '@trpc/server';
import { createMockContext, MockContext } from '../../__mocks__/context.mock';
import { Context } from '../../context';
import { trpcRouter } from '../../index';
import { Errors, ForbiddenError } from '../../errors';
import { AUTHOR } from '../../__fixtures__/authors.fixture';
import { USER } from '../../__fixtures__/users.fixture';
import { CreateAuthorInput } from '../../routes/authors/createAuthor';

describe('@repo/trpc -> Authors -> CreateAuthor', () => {
    const INPUT: CreateAuthorInput = {
        firstName: AUTHOR.firstName,
        lastName: AUTHOR.lastName,
    };
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    it('should create a new author', async () => {
        mockCtx.authorized = true;
        mockCtx.user = USER;

        const expectedResult = {
            author: AUTHOR,
        };

        mockCtx.prisma.author.create.mockResolvedValue(AUTHOR);

        const result = await trpcRouter.createCaller(ctx).createAuthor(INPUT);

        expect(result).toEqual(expectedResult);
    });

    it('should throw an exception if the user is not authorized', async () => {
        mockCtx.authorized = false;

        try {
            await trpcRouter.createCaller(ctx).createAuthor(INPUT);
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
                .createAuthor({} as CreateAuthorInput);
            expect(true).toBeFalsy();
        } catch (error: any) {
            expect(error).toBeInstanceOf(TRPCError);
        }
    });
});
