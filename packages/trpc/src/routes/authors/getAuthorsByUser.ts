import { TRPCError } from '@trpc/server';

import { trpc } from '../../instance';

export const getAuthorsByUserTRPCRoute = trpc.procedure
    .meta({ description: 'Returns authors created by the user' })
    .query(async ({ ctx }) => {
        if (!ctx.authorized || !ctx.user) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        const authors = await ctx.prisma.author.findMany({
            where: {
                userId: ctx.user.id,
            },
        });

        return {
            authors,
        };
    });
