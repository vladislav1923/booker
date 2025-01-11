import { z } from 'zod';
import { trpc } from '../../instance';
import { Errors, ForbiddenError } from '../../errors';

const schema = z.object({
    authorId: z.string().describe('Author Id'),
    firstName: z.string().min(2).max(20).describe('First name'),
    lastName: z.string().min(2).max(20).describe('Last name'),
});

export type UpdateAuthorInput = z.infer<typeof schema>;

export const updateAuthorTRPCRoute = trpc.procedure
    .meta({ description: 'Update an author' })
    .input(schema)
    .mutation(async ({ input, ctx }) => {
        if (!ctx.authorized || !ctx.user) {
            throw new ForbiddenError(Errors.NotAuthorized);
        }

        const updatedAuthor = await ctx.prisma.author.update({
            where: {
                id: input.authorId,
            },
            data: {
                firstName: input.firstName,
                lastName: input.lastName,
            },
        });

        return {
            author: updatedAuthor,
        };
    });
