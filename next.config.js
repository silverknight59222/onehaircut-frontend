/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'api-server.onehaircut.com',
            // port: '',
            // pathname: '/public/api/web/**',
          },
        ],
      },
}

module.exports = nextConfig
