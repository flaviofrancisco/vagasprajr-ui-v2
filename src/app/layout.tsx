import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout-components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vagas para junior na área de tecnologia da informação (TI) | @vagasprajr",
  description: "Site com vagas para junior, estágios; trainees na área de tecnologia da informação (TI)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">     
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link> 
      <body className={inter.className}>        
        <Header />
        {children}        
      </body>      
    </html>
  );
}
