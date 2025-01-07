import { prisma } from '@repo/database';
import { trpc } from '../../instance';
import { z } from 'zod';

const schema = z.object({
    first_name: z.string().min(2).max(20),
    last_name: z.string().min(2).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    confirm_password: z.string().min(6).max(20),
});

export const signUpTRPCRoute = trpc.procedure
    .meta({ description: 'Create a new user' })
    .input(schema)
    .mutation(async ({ input, ctx }) => {
        console.log('ctx', ctx);

        const newUser = await prisma.user.create({ ...input });

        return {
            user: newUser,
        };
    });
