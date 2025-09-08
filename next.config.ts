import type { NextConfig } from "next";
import { routes } from "./constants/routes";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: routes.home,
        destination: routes.dashboard,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
