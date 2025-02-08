import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { trpc } from '../../instance';

const schema = z.object({
    title: z.string().min(2).max(50).describe('Title'),
    description: z.string().optional().nullable().describe('Description'),
    authorId: z.string().describe('Author ID'),
    languageId: z.string().describe('Language ID'),
    statusId: z.string().describe('Status ID'),
});

export type CreateBookInput = z.infer<typeof schema>;

export const createBookTRPCRoute = trpc.procedure
    .meta({ description: 'Create a new book' })
    .input(schema)
    .mutation(async ({ input, ctx }) => {
        if (!ctx.authorized || !ctx.user) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        const newBook = await ctx.prisma.book.create({
            data: {
                title: input.title,
                description: input.description ?? null,
                authorId: input.authorId,
                languageId: input.languageId,
                statusId: input.statusId,
                userId: ctx.user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        return {
            book: newBook,
        };
    });
