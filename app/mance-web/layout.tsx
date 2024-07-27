import { Inter } from "next/font/google";
import "../globals.css";
import NextTopLoader from "nextjs-toploader";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Mance",
    template: "%s — Mance",
  },
  description: "A robust platform for continously stimulating awesome performance from high-energy teams towards intentional strategy execution.",
    icons: "/mance.svg"
    // add more icon formats
};


export default function WebLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader color="#008080" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
