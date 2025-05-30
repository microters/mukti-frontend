// app/layout.js বা যেটি আপনার RootLayout ফাইল
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

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {
  const { locale } = params;
  const direction = dir(locale ?? "en");
  const i18nNamespaces = ["home"];
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        {/* আপনার “হুবহু” স্ক্রিপ্ট ট্যাগ */}
        <script
          id="e6925a1d-d5d5-400c-8ac2-5cee783c1219"
          type="text/javascript"
          src="http://localhost:3000/api/generate-script?id=1eaf4448-d5d5-400c-8ac2-5cee783c1219"
          defer
        ></script>
      </head>
      <body>
        <AuthProvider>
          <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
          >
            <Header />
            {children}
            <Footer />
          </TranslationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
