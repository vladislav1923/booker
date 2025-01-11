'use client';

import { TRPCRouter } from '@repo/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import {
    type CreateTRPCReact,
    // createTRPCProxyClient,
    createTRPCReact,
} from '@trpc/react-query';

export const trpc: CreateTRPCReact<TRPCRouter, unknown, unknown> =
    createTRPCReact<TRPCRouter>();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});

const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: 'http://localhost:3001/trpc',
        }),
    ],
});

// export const trpcProxyClient = createTRPCProxyClient<TRPCRouter>({
//     links: [
//         httpBatchLink({
//             url: 'http://localhost:3001/trpc',
//         }),
//     ],
// });

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
};
