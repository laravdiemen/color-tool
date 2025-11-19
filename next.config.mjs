import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  turbopack: {
    root: path.join(__dirname, ".."),
  },
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
