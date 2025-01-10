import { trpc } from '../../instance';
import { z } from 'zod';
import { BadRequestError, Errors } from '../../errors';

const schema = z.object({
    firstName: z.string().min(2).max(20).describe('First name'),
    lastName: z.string().min(2).max(20).describe('Last name'),
    email: z.string().email().describe('Email'),
    password: z.string().min(6).max(20).describe('Password'),
    confirmPassword: z
        .string()
        .min(6)
        .max(20)
        .describe('Password confirmation'),
});

export const signUpTRPCRoute = trpc.procedure
    .meta({ description: 'Create a new user' })
    .input(schema)
    .mutation(async ({ input, ctx }) => {
        const existingUser = await ctx.prisma.user.findUnique({
            where: {
                email: input.email,
            },
        });

        if (existingUser) {
            throw new BadRequestError(Errors.UserAlreadyExists);
        }

        if (input.password !== input.confirmPassword) {
            throw new BadRequestError(Errors.PasswordsDoNotMatch);
        }

        const newUser = await ctx.prisma.user.create({
            data: {
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                passwordDigest: ctx.generatePasswordDigest(input.password),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        return {
            user: {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            },
        };
    });
