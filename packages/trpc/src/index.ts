import { trpc } from './instance';
import { getMessageTrpcRoute } from './routes/getMessage';
import { getMessagesTrpcRoute } from './routes/getMessages';

export const trpcRouter = trpc.router({
    getMessage: getMessageTrpcRoute,
    getMessages: getMessagesTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
