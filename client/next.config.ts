import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //allowedDevOrigins: ["*.drosinakis.app", "drosinakis.app"],
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: `${Number(process.env.FILE_SIZE) || 100}mb`,
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
