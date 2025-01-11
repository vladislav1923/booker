import { z } from 'zod';

import { Errors, ForbiddenError, NotFoundError } from '../../errors';
import { trpc } from '../../instance';

const schema = z.object({
    bookId: z.string(),
});

export type GetBookInput = z.infer<typeof schema>;

export const getBookTRPCRoute = trpc.procedure
    .meta({ description: 'Returns a book' })
    .input(schema)
    .query(async ({ ctx, input }) => {
        if (!ctx.authorized) {
            throw new ForbiddenError(Errors.NotAuthorized);
        }

        const book = await ctx.prisma.book.findUnique({
            where: {
                id: input.bookId,
            },
        });

        if (!book) {
            throw new NotFoundError(Errors.NotFound);
        }

        return {
            book,
        };
    });
