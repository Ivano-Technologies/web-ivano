import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Marketing site only. Do not attach www/apex domains here — Chief-gated cutover.
  agentRules: false,
  async headers() {
    return [
      {
        // Save the profile as "Ivano Technologies Company Profile.pdf"; URL stays the same.
        source: "/company-profile.pdf",
        headers: [
          {
            key: "Content-Disposition",
            value:
              "attachment; filename=\"Ivano Technologies Company Profile.pdf\"; filename*=UTF-8''Ivano%20Technologies%20Company%20Profile.pdf",
          },
          { key: "Content-Type", value: "application/pdf" },
        ],
      },
    ];
  },
};

export default nextConfig;
