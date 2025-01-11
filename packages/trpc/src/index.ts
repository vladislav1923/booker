import { trpc } from './instance';
import routes from './routes';
import { getMessageTrpcRoute } from './routes/getMessage';
import { getMessagesTrpcRoute } from './routes/getMessages';

export const trpcRouter = trpc.router({
    ...routes,
    getMessage: getMessageTrpcRoute,
    getMessages: getMessagesTrpcRoute,
});

export type TRPCRouter = typeof trpcRouter;
