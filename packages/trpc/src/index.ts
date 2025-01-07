import { trpc } from './instance';
import { getMessageTrpcRoute } from './routes/getMessage';
import { getMessagesTrpcRoute } from './routes/getMessages';
import routes from './routes';

export const trpcRouter = trpc.router({
    getMessage: getMessageTrpcRoute,
    getMessages: getMessagesTrpcRoute,
    ...routes
});

export type TRPCRouter = typeof trpcRouter;
