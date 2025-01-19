import './globals.css';
import '@repo/ui/globals.css';

import { TrpcProvider } from '../trpc';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-[100vh]">
                <TrpcProvider>{children}</TrpcProvider>
            </body>
        </html>
    );
}
