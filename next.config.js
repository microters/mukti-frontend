/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['placehold.co', 'localhost', 'example.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**',
      },
    ],
  },

  i18n: {
    locales: ['en', 'bn'],
    defaultLocale: 'en',
    localeDetection: false,
  },

  trailingSlash: true, // This helps keep `/bn` from breaking
};

module.exports = nextConfig;

