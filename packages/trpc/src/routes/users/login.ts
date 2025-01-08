import { trpc } from '../../instance';
import { z } from 'zod';
import { BadRequestError, Errors } from '../../errors';

const schema = z.object({
    email: z.string().email().describe('Email'),
    password: z.string().min(6).max(20).describe('Password'),
});

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
            throw new BadRequestError(Errors.UserNotFound);
        }

        const passwordDigest = ctx.generatePasswordDigest(input.password);

        if (passwordDigest !== user.password_digest) {
            throw new BadRequestError(Errors.IncorrectEmailOrPassword);
        }

        const token = ctx.signJWT(user.id);

        ctx.res.cookie('token', token, {
            expires: new Date(Date.now() + EXPIRES_IN),
        });

        return {
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            },
        };
    });
