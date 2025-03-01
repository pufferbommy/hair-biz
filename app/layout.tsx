import "./globals.css";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/lib/env";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import Script from "next/script";

const anuphan = Anuphan({
  subsets: ["thai"],
});

export const metadata: Metadata = {
  title: {
    default: "Hair Biz - จัดการร้านตัดผมของคุณอย่างมีประสิทธิภาพ",
    template: "%s | Hair Biz",
  },
  description:
    "Hair Biz เสนอวิธีการจัดการร้านตัดผมที่ครบวงจร จองนัดหมาย จัดการลูกค้า และเติบโตธุรกิจของคุณด้วยแพลตฟอร์มที่ใช้งานง่าย",
  openGraph: {
    title: "Hair Biz - จัดการร้านตัดผมของคุณอย่างมีประสิทธิภาพ",
    description:
      "Hair Biz เสนอวิธีการจัดการร้านตัดผมที่ครบวงจร จองนัดหมาย จัดการลูกค้า และเติบโตธุรกิจของคุณด้วยแพลตฟอร์มที่ใช้งานง่าย",
    url: "https://yourwebsite.com", // Replace with your website URL
    locale: "th_TH",
    siteName: "Hair Biz",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hair Biz - จัดการร้านตัดผมของคุณอย่างมีประสิทธิภาพ",
    description:
      "Hair Biz เสนอวิธีการจัดการร้านตัดผมที่ครบวงจร จองนัดหมาย จัดการลูกค้า และเติบโตธุรกิจของคุณด้วยแพลตฟอร์มที่ใช้งานง่าย",
    site: "@yourtwitterhandle", // Replace with your Twitter handle
  },
  keywords: [
    "การจัดการร้านตัดผม",
    "การจองนัดหมาย",
    "การจัดการลูกค้า",
    "ซอฟต์แวร์ร้านเสริมสวย",
    "การเติบโตของธุรกิจร้านตัดผม",
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="th" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {env.NODE_ENV === "development" && (
          <Script src="https://unpkg.com/react-scan/dist/auto.global.js" />
        )}
      </head>
      <body className={cn("antialiased", anuphan.className)}>
        <Providers>{props.children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
