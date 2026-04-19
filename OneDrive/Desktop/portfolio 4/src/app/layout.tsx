import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "Rajkumar | Digital Nature Portfolio",
  description: "AI Developer, Backend Engineer, and Founder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${sora.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
