import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { trpc } from '../../instance';

const schema = z.object({
    firstName: z.string().min(2).max(20).describe('First name'),
    lastName: z.string().min(2).max(20).describe('Last name'),
});

export type CreateAuthorInput = z.infer<typeof schema>;

export const createAuthorTRPCRoute = trpc.procedure
    .meta({ description: 'Create a new author' })
    .input(schema)
    .mutation(async ({ input, ctx }) => {
        if (!ctx.authorized || !ctx.user) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        const newAuthor = await ctx.prisma.author.create({
            data: {
                firstName: input.firstName,
                lastName: input.lastName,
                userId: ctx.user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        return {
            author: newAuthor,
        };
    });
