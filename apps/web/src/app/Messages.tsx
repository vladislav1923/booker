import {trpcRouter} from '@repo/trpc';

const getMessages = async () => {
    const response = await trpcRouter.createCaller({}).getMessages();

    return response;
}

export const Messages = async () => {
    const messages = await getMessages();

    return (
        <div>
            <h1>Messages</h1>
            <ul>
                {messages.map((message) => (
                    <li key={message.id}>{message.text}</li>
                ))}
            </ul>
        </div>
    );
};
