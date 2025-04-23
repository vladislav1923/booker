import './globals.css';
import '@repo/ui/styles.css';

import GlobalStyles from '../components/GlobalStyles';
import { TrpcProvider } from '../trpc';
import { ToastContainer } from 'react-toastify';

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
                <ToastContainer />
            </body>
        </html>
    );
}
