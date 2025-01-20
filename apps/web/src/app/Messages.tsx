// import { trpcProxyClient } from '../trpc';

const getMessages = async () => {
    // const response = await trpcProxyClient.getMessages.query();
    //
    // return response;

    return [
        { id: 1, text: 'Hello' },
        { id: 2, text: 'World' },
    ];
};

export const Messages = async () => {
    const messages = await getMessages();

    return (
        <div>
            <h1>Messages</h1>
            <ul>
                {messages.map((message) => (
                    <li className="text-5xl" key={message.id}>
                        {message.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};
