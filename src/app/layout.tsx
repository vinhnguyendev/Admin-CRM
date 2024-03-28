import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ActionBar from "@/components/ActionBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex items-start justify-between h-full`}>
        <Sidebar />
        <main className="w-full h-full">
          <ActionBar />
          {children}
          </main>
      </body>
    </html>
  );
}
