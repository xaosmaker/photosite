import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //allowedDevOrigins: ["*.drosinakis.app", "drosinakis.app"],
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "drosinakis.app", pathname: "/static/**" },
    ],
  },
};

export default nextConfig;
