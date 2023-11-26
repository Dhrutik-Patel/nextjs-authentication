import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Next.js Authentication',
    description: 'The ultimate guide for Next.js authentication.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={poppins.className}>
                <Toaster position='top-center' />
                {children}
            </body>
        </html>
    );
}
