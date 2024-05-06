import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const config = {
  transpilePackages: ["@raonc/ui"],
  images: {
    unoptimized: true,
  },
};

export default withContentlayer(config);
