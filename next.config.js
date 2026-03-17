/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/the-descent.html',
      },
    ]
  },
}

module.exports = nextConfig
