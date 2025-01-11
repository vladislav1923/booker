import { z } from 'zod';
import { trpc } from '../../instance';
import { Errors, ForbiddenError } from '../../errors';

const schema = z.object({
    userId: z.string(),
});

export type GetAuthorsByUserId = z.infer<typeof schema>;

export const getAuthorsByUserIdTRPCRoute = trpc.procedure
    .meta({ description: 'Returns authors created by the user' })
    .input(schema)
    .query(async ({ ctx, input }) => {
        if (!ctx.authorized) {
            throw new ForbiddenError(Errors.NotAuthorized);
        }

        const authors = await ctx.prisma.author.findMany({
            where: {
                userId: input.userId,
            },
        });

        return {
            authors,
        };
    });
