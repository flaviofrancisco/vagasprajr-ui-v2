'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import MainHeader from '@/components/layout-components/header';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Provider } from 'react-redux';
import store from '@/services/store';
import PersistLogin from '@/components/auth/login/persist-login';
import MainFooter from '@/components/layout-components/footer';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import AuthProvider from '@/components/auth/login/AuthProvider';
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  modals,
}: Readonly<{
  children: React.ReactNode;
  modals: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>@vagasprajr - Seu site de vagas para juniores; estágio; trainee e pessoas iniciantes na área da tecnologia da informação.</title>
        <meta property="og:title" content="@vagasprajr" />
        <meta property="og:description" content="Site com vagas para juniores; estágio; trainee e pessoas iniciantes na área da tecnologia da informação." />
        <meta property="og:image" content="https://vagasprajr.com.br/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Flogo.51d0c4db.png&w=96&q=75" />
        <meta property="og:url" content="https://vagasprajr.com.br/" />
        <meta property="og:type" content="website" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-full`}>
        <AuthProvider>
          <Provider store={store}>
            <PersistLogin>
              <MainHeader />
              {modals}
              <main className="flex-grow">{children}</main>
              <MainFooter />
            </PersistLogin>
          </Provider>
        </AuthProvider>
      </body>
      <GoogleAnalytics gaId="G-5B72V38Z8J" />
    </html>
  );
}
