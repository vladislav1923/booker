import { TRPCError } from '@trpc/server';

import { trpc } from '../../instance';

export const logoutTRPCRoute = trpc.procedure
    .meta({ description: 'Logout the current user' })
    .query(async ({ ctx }) => {
        if (!ctx.authorized) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        ctx.res.clearCookie('token');

        return {
            user: null,
        };
    });
