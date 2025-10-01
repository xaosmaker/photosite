import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //allowedDevOrigins: ["*.drosinakis.app", "drosinakis.app"],
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "drosinakis.app", pathname: "/static/**" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
