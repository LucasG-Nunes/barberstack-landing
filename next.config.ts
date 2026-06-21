import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // @ts-ignore - The type NextConfig might not include allowedDevOrigins in this specific typing, but it's required for local network testing
  allowedDevOrigins: ['10.0.0.82'],
};

export default nextConfig;
