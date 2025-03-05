// i18nConfig.js
const i18n = require("i18next");
const Backend = require("i18next-fs-backend"); 
const { LanguageDetector } = require("i18next-http-middleware");
const path = require("path");

i18n
  .use(Backend) // ফাইল সিস্টেম থেকে অনুবাদ লোড
  .use(LanguageDetector) // ভাষা ডিটেক্ট করার জন্য
  .init({
    fallbackLng: "en",         // ডিফল্ট ভাষা
    preload: ["en", "bn"],     // আপনি যেসব ভাষা ব্যবহার করবেন
    backend: {
      loadPath: path.join(__dirname, "/locales/{{lng}}/{{ns}}.json"), 
    },
    detection: {
      order: ["querystring", "cookie", "header"], // ভাষা ডিটেক্ট করার পদ্ধতি
      caches: ["cookie"],
    },
    debug: false,
  });

module.exports = i18n;
