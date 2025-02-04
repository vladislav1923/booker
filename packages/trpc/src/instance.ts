import { initTRPC } from '@trpc/server';
import { TRPCPanelMeta } from 'trpc-panel';
import { ZodError } from 'zod';

import { Context } from './context';

export const trpc = initTRPC.meta<TRPCPanelMeta>().context<Context>().create({
    errorFormatter(opts) {
        const { shape, error } = opts;
        console.log('OPTS: ', opts);
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
                        ? error.cause.flatten()
                        : null,
            },
        };
    },
});
