/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 1080],
    imageSizes: [128, 256, 512],
  },
};

module.exports = nextConfig;
