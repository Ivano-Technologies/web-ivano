import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Marketing site only. Do not attach www/apex domains here — Chief-gated cutover.
  agentRules: false,
};

export default nextConfig;
