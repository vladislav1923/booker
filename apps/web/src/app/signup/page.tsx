import { Button } from '@repo/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@repo/ui/card';
import { Input } from '@repo/ui/input';
import { Label } from '@repo/ui/label';

export default function SignUpPage() {
    return (
        <section className="min-h-[100vh] flex justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                        Create an account to use the service
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="Ivan"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Ivanov"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="ivanov@gmail.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}
