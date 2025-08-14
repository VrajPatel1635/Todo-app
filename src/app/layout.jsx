import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tasks — Premium Todo",
  description: "A premium, animated, responsive Todo app built with Next.js, Tailwind, and Framer Motion."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning  data-theme="dark">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950`}>
        <Providers>
          <Header />
          <Container>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}