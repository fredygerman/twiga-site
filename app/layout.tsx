import type React from "react";
import type { Metadata } from "next";
import { Work_Sans, Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Twiga - AI Teaching Companion for Tanzanian Educators",
  description:
    "Empowering Tanzanian teachers with AI-powered lesson support, resources, and guidance through WhatsApp. Meta Llama Impact Grant Award Winner 2024.",
  icons: {
    icon: "/logos/twiga_icon.png",
    apple: "/logos/twiga_icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${openSans.variable} antialiased`}
    >
      <body>
        {children}
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  );
}
