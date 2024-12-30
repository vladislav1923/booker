import {initTRPC} from '@trpc/server';
import {z} from 'zod';

export const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
    getMessage: trpc.procedure.input(z.object({
        name: z.string(),
    })).query(({input}) => ({
        message: `hello ${input.name}`,
    })),
});

export type TrpcRouter = typeof trpcRouter;
