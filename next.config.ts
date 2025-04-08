import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
            }, {
                hostname: 'images.unsplash.com',
                protocol: 'https',
                pathname: '**'
            },
        ],
    },

};

export default nextConfig;
