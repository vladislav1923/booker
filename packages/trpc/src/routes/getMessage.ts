import { z } from 'zod';

import { trpc } from '../instance';

const schema = z.object({
    name: z.string(),
});

export const getMessageTrpcRoute = trpc.procedure
    .input(schema)
    .mutation(({ input }) => {
        return {
            message: `Hello, ${input.name}!`,
        };
    });
