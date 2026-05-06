/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/carousel-claude/',
        destination: '/carousel-claude/index.html',
      },
    ]
  }
}
module.exports = nextConfig
