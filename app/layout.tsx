/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AppProvider from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });
const lex = Lexend({
  subsets: ["latin"],
  adjustFontFallback: false,
  variable: "--font-lex",
});

export const metadata: Metadata = {
  title: "Mance",
  description: "Permance Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={` ${lex.variable}`}>
        <AppProvider>
          {children}
        </AppProvider>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
