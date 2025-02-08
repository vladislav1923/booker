import { trpc } from './instance';
import routes from './routes';

export const trpcRouter = trpc.router({
    ...routes,
});

export type TRPCRouter = typeof trpcRouter;
