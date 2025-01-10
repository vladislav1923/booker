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
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        };
    });
