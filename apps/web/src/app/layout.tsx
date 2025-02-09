import './globals.css';
import '@repo/ui/styles.css';

import GlobalStyles from '../components/GlobalStyles';
import Toaster from '../components/Toaster';
import { TrpcProvider } from '../trpc';

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
                <Toaster />
            </body>
        </html>
    );
}
