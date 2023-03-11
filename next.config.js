/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['mikhail-bahdashych-personal-blog.s3.us-east-2.amazonaws.com'],
    unoptimized: true
  }
};

module.exports = nextConfig;
