import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("Worker runtime dependencies", () => {
  it.each([
    ["contact route", () => import("./contact/route")],
    ["newsletter route", () => import("./newsletter/route")],
    ["unsubscribe route", () => import("./unsubscribe/route")],
  ])("imports the %s without RESEND_API_KEY", async (_name, loadRoute) => {
    vi.stubEnv("RESEND_API_KEY", "");

    await expect(loadRoute()).resolves.toBeDefined();
  });

  it("initializes Resend lazily and reuses the client", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");

    const { getResend } = await import("@/lib/resend-server");

    expect(getResend()).toBe(getResend());
  });
});
