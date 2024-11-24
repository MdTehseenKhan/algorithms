import type { Metadata } from 'next';

import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'sonner';

import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Header />
            <main className="pt-24 max-w-2xl mx-auto">{children}</main>
            <Toaster position="top-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
