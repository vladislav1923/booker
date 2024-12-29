import { TrpcRouter } from '@repo/trpc';
import {createTRPCReact} from '@trpc/react-query';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {httpBatchLink} from '@trpc/client';

const trpc = createTRPCReact<TrpcRouter>()

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false
        },
    },
});

const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: 'http://localhost:3001/trpc',
        })
    ]
});

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    );
};
