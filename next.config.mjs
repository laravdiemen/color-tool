const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  trailingSlash: true, // Ensures correct routing
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: isProd ? "/color-tool/" : "",
  basePath: isProd ? "/color-tool" : "",
  output: "export",
};

export default nextConfig;
