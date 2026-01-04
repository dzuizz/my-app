import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RetroEffects from "@/components/RetroEffects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DZUIZZ.COM",
  description: "Ahmad Dzuizz Annajib - Web Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-zinc-950 text-zinc-300 antialiased selection:bg-emerald-500/30 selection:text-emerald-200`}
      >
        <RetroEffects />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
