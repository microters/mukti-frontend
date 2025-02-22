// next.config.js
// const nextI18NextConfig = require('./next-i18next.config');

module.exports = {
  // i18n: {
  //   locales: ["en", "bn"], // Define supported locales
  //   defaultLocale: "en", // Default language
  //   localeDetection: false,
  // },
  images: {
    domains: ['placehold.co'], // Ensure you only include the domains you use
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**', // Path pattern for local images
      },
      {
        protocol: 'https',
        hostname: 'example.com', // Replace with a real hostname if needed
        pathname: '/images/**',   // Path pattern for external images
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
};
