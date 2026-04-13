import type React from "react";
import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700"],
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
      className={`${fraunces.variable} ${plusJakarta.variable} scroll-smooth antialiased`}
    >
      <body>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Toaster richColors position="top-center" />
        <Analytics />
      </body>
    </html>
  );
}
