import type { Metadata } from 'next';
import { Montserrat, Roboto } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SFL Tanzania',
  description:
    'Students For Liberty Tanzania — Tawi rasmi la SFL, kuwawezesha viongozi wa uhuru wa kesho.',
  openGraph: {
    title: 'SFL Tanzania',
    description:
      'Students For Liberty Tanzania — Tawi rasmi la SFL, kuwawezesha viongozi wa uhuru wa kesho.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sw" className={`${montserrat.variable} ${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
