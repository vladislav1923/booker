import { Errors, ForbiddenError } from '../../errors';
import { trpc } from '../../instance';

export const getAuthorsByUserTRPCRoute = trpc.procedure
    .meta({ description: 'Returns authors created by the user' })
    .query(async ({ ctx }) => {
        if (!ctx.authorized || !ctx.user) {
            throw new ForbiddenError(Errors.NotAuthorized);
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
