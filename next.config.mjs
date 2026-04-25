/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.iejimaiguide.com'
          }
        ],
        destination: 'https://iejimaiguide.com/:path*',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
