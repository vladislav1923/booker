import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { trpc } from '../../instance';

const schema = z.object({
    authorId: z.string(),
});

export type DeleteAuthorInput = z.infer<typeof schema>;

export const deleteAuthorTRPCRoute = trpc.procedure
    .meta({ description: 'Delete an author' })
    .input(schema)
    .mutation(async ({ ctx, input }) => {
        if (!ctx.authorized) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        await ctx.prisma.author.delete({
            where: {
                id: input.authorId,
            },
        });

        return {
            author: null,
        };
    });
