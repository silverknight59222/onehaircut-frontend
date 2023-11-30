/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@babel/preset-react",
  "@fullcalendar/common",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
  "@fullcalendar/timegrid",
]);

module.exports = withTM({
  // your custom config goes here
});
const nextConfig = {
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'onehaircut-api-server.abc',
            // port: '',
            // pathname: '/public/api/web/**',
          },
          {
            protocol: 'https',
            hostname: 'api.onehaircut.com',
            // port: '',
            // pathname: '/public/api/web/**',
          },
          {
            protocol: 'http',
            hostname: '127.0.0.1',
            port: '8000',
            // pathname: '/public/api/web/**',
          }          
        ],
      },
}

module.exports = nextConfig
