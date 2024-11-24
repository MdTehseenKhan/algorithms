import type { Metadata } from 'next';

import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'sonner';

import { Header } from './header';

import './globals.css';

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
      <body className="antialiased font-sans min-h-dvh">
        <Header />
        <main className="pt-24 max-w-2xl mx-auto">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
