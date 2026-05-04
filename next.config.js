/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['react-icons'],
  distDir: '.next-build',
}

module.exports = nextConfig
