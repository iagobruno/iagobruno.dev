import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  pageExtensions: ['ts', 'tsx', 'mdx'],
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ['*.ngrok-free.app'],
  experimental: {
    mdxRs: true,
    viewTransition: true,
  },
  devIndicators: false,
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  // extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
