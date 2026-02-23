import "./globals.css";

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { Navbar } from "@/components/layout/navbar";
import localFont from "next/font/local";
import AnimatedBackground from "@/components/layout/animated-background";
import AlarmProvider from "@/components/alarm-provider";

const digital = localFont({
  src: "./fonts/DigitalNumbers-Regular.ttf",
  variable: "--font-digital",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "MUT Dashboard",
  description: "Machine Monitoring System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={digital.variable} suppressHydrationWarning>
      <body className="h-screen flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* Background */}
          <AnimatedBackground />

          {/* Navbar */}
          <Navbar />

          {/* Content */}
          <main className="flex-1 relative z-10">{children}</main>

          {/* 🔥 Alarm Overlay */}
          <AlarmProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
