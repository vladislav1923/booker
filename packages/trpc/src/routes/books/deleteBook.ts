import { z } from 'zod';

import { Errors, ForbiddenError } from '../../errors';
import { trpc } from '../../instance';

const schema = z.object({
    bookId: z.string(),
});

export type DeleteBookInput = z.infer<typeof schema>;

export const deleteBookTRPCRoute = trpc.procedure
    .meta({ description: 'Delete a book' })
    .input(schema)
    .mutation(async ({ ctx, input }) => {
        if (!ctx.authorized) {
            throw new ForbiddenError(Errors.NotAuthorized);
        }

        await ctx.prisma.book.delete({
            where: {
                id: input.bookId,
            },
        });

        return {
            book: null,
        };
    });
