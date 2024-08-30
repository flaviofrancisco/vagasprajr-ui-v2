'use client';
import { Inter } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import LeftMenuComponent from '@/components/layout-components/left-menu';
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export default function Layout({
  children,
  modals,
}: Readonly<{
  children: React.ReactNode;
  modals: React.ReactNode;
}>) {
  return (
    <div className="grid w-full flex-grow">
      <LeftMenuComponent>
        <div className="flex flex-grow">{children}</div>
        {modals}
      </LeftMenuComponent>
    </div>
  );
}
