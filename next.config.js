/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "bn"], // supported languages
    defaultLocale: "en", // default language
    localeDetection: false, // disable automatic language detection
  },
};

module.exports = nextConfig;
