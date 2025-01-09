import { trpc } from '../../instance';
import { Errors, ForbiddenError } from '../../errors';

export const getCurrentUserTRPCRoute = trpc.procedure
    .meta({ description: 'Returns the current authorized user' })
    .query(async ({ ctx }) => {
        if (!ctx.authorized || !ctx.user) {
            throw new ForbiddenError(Errors.NotAuthorized);
        }

        const user = ctx.user;

        return {
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            },
        };
    });
