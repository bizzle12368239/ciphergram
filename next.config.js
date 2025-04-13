/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  async redirects() {
    return [
      {
        source: '/recroom',
        destination: '/ironwood/recroom',
        permanent: true,
      },
      {
        source: '/library',
        destination: '/ironwood/library',
        permanent: true,
      },
      {
        source: '/prisoncell',
        destination: '/ironwood/prisoncell',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
