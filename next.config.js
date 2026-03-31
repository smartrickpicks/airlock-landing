/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/the-descent.html',
      },
      {
        source: '/careers',
        destination: '/join-airlock.html',
      },
    ]
  },
}

module.exports = nextConfig
