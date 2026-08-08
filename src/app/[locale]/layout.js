// app/[locale]/layout.js (FIXED)

import { dir } from "i18next";
import i18nConfig from "../../../i18nConfig";
import initTranslations from "@/i18n";
import TranslationsProvider from "../Component/TranslationProvider";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { AuthProvider } from "./utils/AuthContext";
import CookieConsentClient from "../Component/CookieConsent/CookieConsent";
import { fetchFooterData, fetchHeaderData } from "../api/dynamicData,";

export const metadata = {
  title: "Mukti Hospital - Cumilla | মুক্তি হসপিটাল - কুমিল্লা",
  description:
    "Mukti Hospital Cumilla — trusted care with 30+ specialist doctors, pathology tests, NICU & 24/7 emergency. Book your doctor appointment online or call now.",
};

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

// ✅ FIX: ফাংশন সিগনেচার পরিবর্তন করে শুধু 'params' নিন
export default async function RootLayout({ children, params }) {
  const resolvedParams = await params;
  const { locale = "en" } = resolvedParams;
  const direction = dir(locale);
  const i18nNamespaces = ["home"];

  // ✅ একবারেই সব লোড
  const [{ resources }, headerData, footerData] = await Promise.all([
    initTranslations(locale, i18nNamespaces),
    fetchHeaderData(locale),
    fetchFooterData(locale),
  ]);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head />
      <body>
        <AuthProvider>
          <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
          >
            {/* ✅ এখন Header/Footer data props আকারে */}
            <Header headerData={headerData} />
            <CookieConsentClient />
            {children}
            <Footer footerData={footerData} />
          </TranslationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}