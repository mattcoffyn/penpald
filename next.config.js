/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.ltrbxd.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'secure.gravatar.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
