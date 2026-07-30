import site from "./site.config.json" with { type: "json" };

const production = process.env.NODE_ENV === "production";
const basePath = production
  ? (process.env.NEXT_PUBLIC_BASE_PATH ?? site.productionBasePath)
  : "";

/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false
};

export default nextConfig;
