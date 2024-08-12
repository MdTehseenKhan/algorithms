import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';

import './globals.css';
import { Header } from './header';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Algorithms',
  description:
    'A demonstration/visualization of sorting algorithms built by Md. Tehseen Khan',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="antialiased font-sans">
        <Header />
        <main className="mt-20">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
