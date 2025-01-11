import { z } from 'zod';
import { trpc } from '../../instance';
import { Errors, ForbiddenError, NotFoundError } from '../../errors';

const schema = z.object({
    authorId: z.string(),
});

export const getAuthorByIdTRPCRoute = trpc.procedure
    .meta({ description: 'Returns the current authorized user' })
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
