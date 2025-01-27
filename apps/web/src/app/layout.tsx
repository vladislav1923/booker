import './globals.css';
import '@repo/ui/styles.css';

import { TrpcProvider } from '../trpc';
import { GlobalStyles } from './GlobalStyles';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="min-h-[100vh]">
                <GlobalStyles />
                <TrpcProvider>{children}</TrpcProvider>
            </body>
        </html>
    );
}
