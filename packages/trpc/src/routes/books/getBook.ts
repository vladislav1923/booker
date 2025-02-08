import { TRPCError } from '@trpc/server';
import { z } from 'zod';

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
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        const book = await ctx.prisma.book.findUnique({
            where: {
                id: input.bookId,
            },
        });

        if (!book) {
            throw new TRPCError({ code: 'NOT_FOUND' });
        }

        return {
            book,
        };
    });
