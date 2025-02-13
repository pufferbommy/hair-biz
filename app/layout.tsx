import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import type React from "react";

const anuphan = Anuphan();

export const metadata: Metadata = {
  title: {
    default: "Hair Biz - Streamline Your Barber Shop Management",
    template: "%s | Hair Biz",
  },
  description:
    "Hair Biz offers a comprehensive solution for barber shop management. Schedule appointments, manage clients, and grow your business with our easy-to-use platform.",
  keywords: [
    "barber shop management",
    "appointment scheduling",
    "client management",
    "hair salon software",
    "barbershop business growth",
  ],
  authors: [{ name: "Hair Biz Team" }],
  creator: "Hair Biz",
  publisher: "Hair Biz",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${anuphan.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
