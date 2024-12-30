import {trpc} from '../instance';

export const getMessagesTrpcRoute = trpc.procedure
    .query(() => {
        return [
            {
                id: '1',
                text: 'Hello, world!',}
                ,
            { id: '2', text: 'Goodbye, world!',
            }
        ];
    });

