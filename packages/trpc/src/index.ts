import {initTRPC} from '@trpc/server';

const trpc = initTRPC.create();

export const trpcRouter = trpc.router({
    getMessage: trpc.procedure.query(() => 'hello anonymous'),
});

export type TrpcRouter = typeof trpcRouter;
