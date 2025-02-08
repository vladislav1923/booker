import { TRPCError } from '@trpc/server';

import { trpc } from '../../instance';

export const getBooksByUserTRPCRoute = trpc.procedure
    .meta({ description: 'Returns books created by the user' })
    .query(async ({ ctx }) => {
        if (!ctx.authorized || !ctx.user) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        const books = await ctx.prisma.book.findMany({
            where: {
                userId: ctx.user.id,
            },
        });

        return {
            books,
        };
    });
