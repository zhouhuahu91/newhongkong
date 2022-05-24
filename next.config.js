/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/order",
        destination: "/menu",
        permanent: true,
      },
    ];
  },
  i18n: {
    locales: ["nl", "en", "de"],
    defaultLocale: "nl",
  },
};

module.exports = nextConfig;
