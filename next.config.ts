import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.legalblink.it https://va.vercel-scripts.com https://widget.tabnav.com",
              "style-src 'self' 'unsafe-inline' https://app.legalblink.it https://widget.tabnav.com",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://app.legalblink.it https://tabnav.com https://*.tabnav.com",
              "frame-src 'self' https://app.legalblink.it https://tabnav.com https://*.tabnav.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
            ].join("; "),
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
