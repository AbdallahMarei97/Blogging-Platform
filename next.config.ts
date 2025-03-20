import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*", // Allow images from all domains
      },
    ],
  },
  webpack: (config) => {
    // https://github.com/kelektiv/node.bcrypt.js/issues/874#issuecomment-833582766
    config.externals = [...config.externals, "bcrypt"];
    return config;
  },
};

export default nextConfig;
