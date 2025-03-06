/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,

  // Image optimization settings
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

  // Internationalization (i18n) settings
  i18n: {
    locales: ['en', 'bn'], // Supported locales
    defaultLocale: 'en', // Default locale
    localeDetection: false, // Disable automatic locale detection
  },

  // Enable trailing slash in URLs (useful for static hosting)
  trailingSlash: true, // This helps keep `/bn` from breaking

  // Webpack configuration (optional, for custom path aliases)
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },

  // Additional custom configurations (optional)
  env: {
    CUSTOM_ENV_VAR: 'value', // Example of custom environment variable
  },
};

module.exports = nextConfig;
