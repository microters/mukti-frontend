import { dir } from "i18next";
import i18nConfig from "../../../i18nConfig";
import initTranslations from "@/i18n";
import TranslationsProvider from "../Component/TranslationProvider";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import { AuthProvider } from "./utils/AuthContext";

export const metadata = {
  title: "Mukti Hospital",
  description: "Generated by create next app",
};

// ✅ Generate static params for localization
export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

// ✅ RootLayout (Server Component)
export default async function RootLayout({ children, params }) {
  // Await for the params to ensure they're available before use
  const { locale } = await params;
  const direction = dir(locale ?? "en"); // Set text direction (ltr/rtl)

  // Fetch translations for the current locale
  const i18nNamespaces = ["home"];
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body>
        <AuthProvider>
          <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
            <Header />
            {children}
            <Footer/>
          </TranslationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
