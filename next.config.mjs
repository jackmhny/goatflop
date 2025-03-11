/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [],
  },
  typescript: {
    // During development, type errors get reported but don't block the build
    ignoreBuildErrors: true,
  },
  eslint: {
    // During development, ESLint errors get reported but don't block the build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;