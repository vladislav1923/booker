import { prisma } from '@repo/database';
import { trpc } from '../../instance';
import { z } from 'zod';
import { generatePasswordDigest } from '../../utils/secure';

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
    .mutation(async ({ input }) => {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: input.email,
            },
        });

        if (existingUser) {
            throw new Error('User already exists');
        }

        if (input.password !== input.confirm_password) {
            throw new Error('Passwords do not match');
        }

        const newUser = await prisma.user.create({
            data: {
                first_name: input.first_name,
                last_name: input.last_name,
                email: input.email,
                password_digest: generatePasswordDigest(input.password),
                created_at: new Date(),
                updated_at: new Date(),
            },
        });

        delete newUser.password_digest;

        return {
            user: newUser,
        };
    });
