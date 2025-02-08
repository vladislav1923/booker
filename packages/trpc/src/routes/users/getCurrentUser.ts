import { User } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { trpc } from '../../instance';

export const getCurrentUserTRPCRoute = trpc.procedure
    .meta({ description: 'Returns the current authorized user' })
    .query(async ({ ctx }) => {
        if (!ctx.authorized || !ctx.user) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        const user: User = ctx.user;

        return {
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        };
    });
