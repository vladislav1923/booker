import { z } from 'zod';

import { Errors, ForbiddenError, NotFoundError } from '../../errors';
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
            throw new ForbiddenError(Errors.NotAuthorized);
        }

        const author = await ctx.prisma.author.findUnique({
            where: {
                id: input.authorId,
            },
        });

        if (!author) {
            throw new NotFoundError(Errors.AuthorNotFound);
        }

        return {
            author,
        };
    });
