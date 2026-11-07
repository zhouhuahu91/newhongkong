/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  // Only cache static assets; see pwa.runtimeCache.js for why.
  runtimeCaching: require("./pwa.runtimeCache"),
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
});

const nextConfig = {
  reactStrictMode: false,
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

module.exports = withPWA(nextConfig);
