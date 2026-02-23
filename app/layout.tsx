import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/layout/navbar";
import localFont from "next/font/local";

const digital = localFont({
  src: "./fonts/DigitalNumbers-Regular.ttf",
  variable: "--font-digital",
  weight: "400",
  style: "normal",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={digital.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1 p-6">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
