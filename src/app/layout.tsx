import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MainHeader from '@/components/layout-components/header';
import GoogleAnalytics from '@/app/GoogleAnalytics';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vagas para junior na área de tecnologia da informação (TI) | @vagasprajr',
  description: 'Site com vagas para junior, estágios; trainees na área de tecnologia da informação (TI)',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body className={inter.className}>
        <MainHeader />
        {children}
        {/* <MainFooter/>       */}
      </body>
    </html>
  );
}
