/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.davidnaimi.dev",
          },
        ],
        destination: "https://davidnaimi.dev/:path*",
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
