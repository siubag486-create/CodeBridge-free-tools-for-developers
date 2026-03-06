import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/tools/cron-parser",
        destination: "/tools/cron-expression-parser",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
