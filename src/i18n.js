import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/i18n/{{ns}}/{{lng}}.json', // Define translation file path
    },
    fallbackLng: 'en', // Default language
    debug: true, // Set to `true` to see logs during development
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: true, // Set to `false` if you don't want to use Suspense
    },
    detection: {
      order: ['navigator', 'localStorage', 'querystring', 'cookie'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;
