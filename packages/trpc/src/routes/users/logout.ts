import { Errors, ForbiddenError } from '../../errors';
import { trpc } from '../../instance';

export const logoutTRPCRoute = trpc.procedure
    .meta({ description: 'Logout the current user' })
    .query(async ({ ctx }) => {
        if (!ctx.authorized) {
            throw new ForbiddenError(Errors.NotAuthorized);
        }

        ctx.res.clearCookie('token');

        return {
            user: null,
        };
    });
