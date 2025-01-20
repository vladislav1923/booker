import { Form } from './Form';
import { Messages } from './Messages';

export default function Web() {
    return (
        <div>
            <h1 className="text-amber-500">Web</h1>

            <Messages />

            <Form />
        </div>
    );
}
