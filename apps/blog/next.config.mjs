/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@raonc/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
