import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { trpc } from '../../instance';

const schema = z.object({
    bookId: z.string().describe('Author Id'),
    title: z.string().min(2).max(50).describe('Title'),
    description: z.string().optional().describe('Description'),
    authorId: z.string().describe('Author ID'),
    languageId: z.string().describe('Language ID'),
    statusId: z.string().describe('Status ID'),
});

export type UpdateBookInput = z.infer<typeof schema>;

export const updateBookTRPCRoute = trpc.procedure
    .meta({ description: 'Update a book' })
    .input(schema)
    .mutation(async ({ input, ctx }) => {
        if (!ctx.authorized || !ctx.user) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        const updatedBook = await ctx.prisma.book.update({
            where: {
                id: input.bookId,
            },
            data: {
                title: input.title,
                description: input.description,
                authorId: input.authorId,
                languageId: input.languageId,
                statusId: input.statusId,
                userId: ctx.user.id,
                updatedAt: new Date(),
            },
        });

        return {
            book: updatedBook,
        };
    });
