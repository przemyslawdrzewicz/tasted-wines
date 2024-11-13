/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: { domains: ['firebasestorage.googleapis.com'] },
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
