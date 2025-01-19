import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@repo/ui/card';

import { Form } from './Form';
import { Messages } from './Messages';

export default function Web() {
    return (
        <div>
            <h1 className="text-amber-500">Web</h1>

            <Messages />

            <Form />

            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    );
}
