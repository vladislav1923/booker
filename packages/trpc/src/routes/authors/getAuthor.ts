import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { trpc } from '../../instance';

const schema = z.object({
    authorId: z.string(),
});

export type GetAuthorInput = z.infer<typeof schema>;

export const getAuthorTRPCRoute = trpc.procedure
    .meta({ description: 'Returns an author' })
    .input(schema)
    .query(async ({ ctx, input }) => {
        if (!ctx.authorized) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        const author = await ctx.prisma.author.findUnique({
            where: {
                id: input.authorId,
            },
        });

        if (!author) {
            throw new TRPCError({ code: 'NOT_FOUND' });
        }

        return {
            author,
        };
    });
