import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    lng: "en", // default language
    fallbackLng: "en", // fallback language
    debug: true,
    resources: {
      en: {
        translation: require("./public/locales/en.json"),
      },
      bn: {
        translation: require("./public/locales/bn.json"),
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
