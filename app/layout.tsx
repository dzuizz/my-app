import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';

import '@/app/globals.css';

const jetbrains = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'dzuizz@portfolio',
  description: 'Locked In',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrains.className}`}>
        {children}
      </body>
    </html>
  );
}
