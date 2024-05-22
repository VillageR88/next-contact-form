import './globals.css';
import type { Metadata } from 'next';
import { Karla } from 'next/font/google';
import DataProvider from '@/app/_providers/DataContext';

const karla = Karla({
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-karla',
  subsets: ['latin-ext'],
});

export const metadata: Metadata = {
  title: 'Contact form',
  description: 'Contact form',
  applicationName: 'Contact form',
} as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <meta property="og:image" content={undefined} />
      </head>
      <body className={`${karla.variable} bg-[#E0F1E8]`}>
        <DataProvider>{children}</DataProvider>
      </body>
    </html>
  );
}
