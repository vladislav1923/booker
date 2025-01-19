import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@repo/ui/card';

export default function SignUpPage() {
    return (
        <section className="min-h-[100vh] flex justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>Create an account to use the service</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </section>
    );
};
