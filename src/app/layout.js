"use client";
import "../../i18n"; // ✅ i18n ইনিশিয়ালাইজ করতে হবে
import { useTranslation } from "react-i18next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const { i18n, t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <html lang={loaded ? i18n.language : "en"} suppressHydrationWarning>
      <head>
        <title>{loaded ? t("title") : "Mukti Hospital"}</title>
        <meta
          name="description"
          content={loaded ? t("description") : "Best hospital for medical care"}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* ✅ Header-এ ভাষা পরিবর্তন ফিচার থাকায় এখানে LanguageSwitcher রাখা হয়নি */}
      
        {children}
      </body>
    </html>
  );
}
