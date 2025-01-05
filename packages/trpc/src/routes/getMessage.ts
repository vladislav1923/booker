import { trpc } from '../instance';
import { z } from 'zod';

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
