import {trpc} from './instance';
import {getMessageTrpcRoute} from './routes/getMessage';


export const trpcRouter = trpc.router({
    getMessage: getMessageTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
