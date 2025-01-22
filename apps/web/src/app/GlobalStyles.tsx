'use client';

import './globals.css';
import '@repo/ui/globals.css';

import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['400', '500', '700'],
    style: ['normal'],
    subsets: ['latin', 'cyrillic'],
    display: 'swap',
});

export function GlobalStyles() {
    return (
        <style jsx global>{`
            html {
                font-family: ${roboto.style.fontFamily};
            }
        `}</style>
    );
}
