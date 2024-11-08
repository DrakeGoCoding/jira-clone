import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { QueryProvider } from '@/components/query-provider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

import './globals.css';

const inter = Inter({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Jira Clone',
  description: 'A Jira clone with Next.js, React, and TypeScript.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'min-h-screen antialiased')}>
        <NuqsAdapter>
          <QueryProvider>
            <Toaster />
            {children}
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
