const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['http://192.168.10.38:3000'],
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 1080],
    imageSizes: [128, 256, 512],
  },
};

module.exports = withNextIntl(nextConfig);
