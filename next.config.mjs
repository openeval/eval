// @ts-check

import "./src/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // useSearchParams should be wrapped with a Suspense boundary https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
  missingSuspenseWithCSRBailout: false,
};
export default config;
