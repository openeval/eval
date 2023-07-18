// @ts-check

import "./src/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: { serverActions: true },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
export default config;
