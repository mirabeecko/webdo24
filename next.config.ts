import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "webdo24.cz" }],
        destination: "https://www.webdo24.cz/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
