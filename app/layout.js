import "./globals.css";
import Link from "next/link";
import { Geist, Geist_Mono } from 'next/font/google';
import ThemeBtn from "@/src/components/ThemeBtn";
import { ThemeProvider } from "next-themes";

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});
export const metadata = {
  title: "Chest",
  description: "A Locker for your thoughts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} antialiased bg-background`}
      >
        
        <ThemeProvider attribute="class">
          <h1 className="text-center font-mono font-bold text-4xl my-5 text-foreground"><Link href="/">Chest</Link></h1>
          <div className="fixed top-5 left-5"><ThemeBtn /></div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
