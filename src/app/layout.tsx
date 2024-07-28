import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout-components/header";
import MainFooter from "@/components/layout-components/footer";

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
      <body className={inter.className}>        
        <Header />
        {children}  
        <MainFooter/>      
      </body>      
    </html>
  );
}
