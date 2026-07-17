import { describe, expect, it, vi } from "vitest";
import nextConfig from "./next.config";

vi.mock("@opennextjs/cloudflare", () => ({
  initOpenNextCloudflareForDev: vi.fn(),
}));

function parseDirectives(policy: string) {
  return Object.fromEntries(
    policy.split("; ").map((directive) => {
      const [name, ...sources] = directive.split(" ");
      return [name, sources];
    }),
  );
}

describe("Content Security Policy", () => {
  it("allows only the Google Tag Manager origins needed by its two snippets", async () => {
    const headerGroups = await nextConfig.headers?.();
    const policy = headerGroups?.[0].headers.find(
      ({ key }) => key === "Content-Security-Policy",
    )?.value;

    expect(policy).toBeDefined();

    const directives = parseDirectives(policy ?? "");

    expect(directives["script-src"]).toContain(
      "https://www.googletagmanager.com",
    );
    expect(directives["frame-src"]).toContain(
      "https://www.googletagmanager.com",
    );

    const googleOrigins = policy?.match(/https:\/\/[^\s;]*google[^\s;]*/g);
    expect(googleOrigins).toEqual([
      "https://www.googletagmanager.com",
      "https://www.googletagmanager.com",
    ]);
  });

  it("allows only the Meta Pixel origins needed by its loader and event transport", async () => {
    const headerGroups = await nextConfig.headers?.();
    const policy = headerGroups?.[0].headers.find(
      ({ key }) => key === "Content-Security-Policy",
    )?.value;

    expect(policy).toBeDefined();

    const directives = parseDirectives(policy ?? "");

    expect(directives["script-src"]).toContain(
      "https://connect.facebook.net",
    );
    expect(directives["connect-src"]).toEqual(
      expect.arrayContaining([
        "https://connect.facebook.net",
        "https://www.facebook.com",
      ]),
    );

    const metaOrigins = policy?.match(
      /https:\/\/[^\s;]*(?:facebook\.net|facebook\.com)[^\s;]*/g,
    );
    expect(metaOrigins).toEqual([
      "https://connect.facebook.net",
      "https://connect.facebook.net",
      "https://www.facebook.com",
    ]);
  });
});
