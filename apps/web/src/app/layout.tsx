import './globals.css';

import { TrpcProvider } from '../trpc';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <TrpcProvider>{children}</TrpcProvider>
            </body>
        </html>
    );
}
