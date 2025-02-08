import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { trpc } from '../../instance';

const schema = z.object({
    email: z.string().email().describe('Email'),
    password: z.string().min(6).max(20).describe('Password'),
});

export type LoginInput = z.infer<typeof schema>;

const EXPIRES_IN = 1000 * 60 * 60 * 24;

export const loginTRPCRoute = trpc.procedure
    .meta({ description: 'Login a user' })
    .input(schema)
    .mutation(async ({ input, ctx }) => {
        const user = await ctx.prisma.user.findUnique({
            where: {
                email: input.email,
            },
        });

        if (!user) {
            throw new TRPCError({ code: 'NOT_FOUND' });
        }

        const passwordDigest = ctx.generatePasswordDigest(input.password);

        if (passwordDigest !== user.passwordDigest) {
            throw new TRPCError({ code: 'BAD_REQUEST' });
        }

        const token = ctx.signJWT(user.id);

        ctx.res.cookie('token', token, {
            expires: new Date(Date.now() + EXPIRES_IN),
        });

        return {
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        };
    });
