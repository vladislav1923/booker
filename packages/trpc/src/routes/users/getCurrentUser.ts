import { User } from '@prisma/client';

import { Errors, ForbiddenError } from '../../errors';
import { trpc } from '../../instance';

export const getCurrentUserTRPCRoute = trpc.procedure
    .meta({ description: 'Returns the current authorized user' })
    .query(async ({ ctx }) => {
        if (!ctx.authorized || !ctx.user) {
            throw new ForbiddenError(Errors.NotAuthorized);
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
