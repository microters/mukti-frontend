module.exports = {
  images: {
    domains: ['placehold.co', 'localhost'],  // Add 'localhost' here
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**', // Allow images from localhost:5000/uploads
      },
      {
        protocol: 'https',
        hostname: 'example.com', // Example for other external domains
        pathname: '/images/**',
      },
    ],
  },
  reactStrictMode: true, // Enable strict mode in React (helpful for development)
  swcMinify: true, // Use SWC for minification (fast and efficient)
};
