'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MainHeader from '@/components/layout-components/header';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Provider } from 'react-redux';
import store from '@/services/store';
import PersistLogin from '@/components/auth/login/persist-login';
import MainFooter from '@/components/layout-components/footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <PersistLogin>
            <MainHeader />
            {children}
            <MainFooter />
          </PersistLogin>
        </Provider>
      </body>
      <GoogleAnalytics gaId="G-5B72V38Z8J" />
    </html>
  );
}
