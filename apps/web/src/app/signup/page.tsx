import { Button } from '@repo/ui/button';
import { Checkbox } from '@repo/ui/checkbox';
import { Input } from '@repo/ui/input';
import { Label } from '@repo/ui/label';

export default function SignUpPage() {
    return (
        <section className="min-h-[100vh] flex">
            <img
                className="h-[100vh] max-w-[500px]"
                src="/images/library-1.jpg"
                alt="library"
            />
            <div className="p-10 flex justify-center items-center">
                <form className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            type="text"
                            placeholder="Ivan"
                            required
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            type="text"
                            placeholder="Ivanov"
                            required
                        />
                    </div>
                    <div className="col-span-6">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="ivanov@gmail.com"
                            required
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <Label htmlFor="confirmPassword">
                            Confirm Password
                        </Label>
                        <Input id="confirmPassword" type="password" required />
                    </div>
                    <div className="col-span-6">
                        <Checkbox id="marketingAccept" />
                        <Label htmlFor="marketingAccept">
                            <span className="text-sm pl-1">
                                I want to receive emails about events, product
                                updates and company announcements.
                            </span>
                        </Label>
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
            </div>
        </section>
    );
}
