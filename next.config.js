const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image configuration
  images: {
    remotePatterns: [
      {
        hostname: 'd1vrktyrl6krjd.cloudfront.net',
        protocol: 'https',
        pathname: '**'
      },
      {
        hostname: 'i.pravatar.cc',
        protocol: 'https',
        pathname: '**'
      },
      {
        hostname: 'images.dmca.com',
        protocol: 'https',
        pathname: '**'
      },
      {
        hostname: 'via.placeholder.com',
        protocol: 'https',
        pathname: '**'
      },
      {
        hostname: 'randomuser.me',
        protocol: 'https',
        pathname: '**'
      }, 
      {
        hostname: 'images.unsplash.com',
        protocol: 'https',
        pathname: '**'
      },
    ],
    domains: ['localhost']
  },
};

module.exports = withNextIntl(nextConfig);
