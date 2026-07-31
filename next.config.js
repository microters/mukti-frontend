/** @type {import('next').NextConfig} */
// const path = require('path');

const nextConfig = {
  reactStrictMode: true,

  // Image optimization settings
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**',
      },
      // Mukti Hospital এর জন্য HTTP এবং HTTPS দুটোই অ্যালাউ করা হলো
      {
        protocol: 'http',
        hostname: 'api.muktihospital.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.muktihospital.com',
        pathname: '/uploads/**',
      },
    ],
  },

  trailingSlash: true,

  env: {
    CUSTOM_ENV_VAR: 'value',
  },
};

module.exports = nextConfig;