import { basePath } from "./lib/repoConfig.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath,
  assetPrefix: `${basePath}/`,
  trailingSlash: true,
};

export default nextConfig;
