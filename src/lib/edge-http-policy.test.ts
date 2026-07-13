import { describe, expect, it, vi } from "vitest";
import { enforceHttpTransportPolicy } from "@/lib/edge-http-policy";

describe("edge HTTP transport policy", () => {
  it.each(["GET", "HEAD"])(
    "redirects HTTP %s to the exact HTTPS resource in one 308 response",
    async (method) => {
      const forward = vi.fn(async () => new Response("origin"));
      const request = new Request(
        "http://labmanagergestionale.com/api/contact/path%20encoded?source=seo&empty=",
        { method },
      );

      const response = await enforceHttpTransportPolicy(request, forward);

      expect(response.status).toBe(308);
      expect(response.headers.get("location")).toBe(
        "https://labmanagergestionale.com/api/contact/path%20encoded?source=seo&empty=",
      );
      expect(response.headers.get("x-labmanager-edge-policy")).toBe(
        "redirect-http-to-https",
      );
      expect(forward).not.toHaveBeenCalled();
    },
  );

  it.each(["POST", "PUT", "PATCH", "DELETE", "OPTIONS"])(
    "blocks HTTP %s before the OpenNext origin handler",
    async (method) => {
      const forward = vi.fn(async () => new Response("origin"));
      const response = await enforceHttpTransportPolicy(
        new Request("http://labmanagergestionale.com/api/contact", {
          method,
          body: method === "POST" ? "name=Edge+Probe" : undefined,
        }),
        forward,
      );

      expect(response.status).toBe(400);
      expect(response.headers.get("x-labmanager-edge-policy")).toBe(
        "block-insecure-http-method",
      );
      expect(forward).not.toHaveBeenCalled();
    },
  );

  it("forwards HTTPS requests without changing their method or body", async () => {
    const originResponse = new Response("origin", { status: 202 });
    const forward = vi.fn(async () => originResponse);
    const request = new Request(
      "https://labmanagergestionale.com/api/contact?source=secure",
      { method: "POST", body: "payload" },
    );

    const response = await enforceHttpTransportPolicy(request, forward);

    expect(response).toBe(originResponse);
    expect(forward).toHaveBeenCalledOnce();
    expect(forward).toHaveBeenCalledWith(request);
  });

  it("leaves local and preview host transport to the preview runtime", async () => {
    const previewResponse = new Response("preview", { status: 200 });
    const forward = vi.fn(async () => previewResponse);
    const request = new Request("http://localhost:8787/preview?mode=local");

    const response = await enforceHttpTransportPolicy(request, forward);

    expect(response).toBe(previewResponse);
    expect(forward).toHaveBeenCalledWith(request);
  });

  it("uses Cloudflare's visitor scheme when the Worker URL is normalized", async () => {
    const forward = vi.fn(async () => new Response("origin"));
    const response = await enforceHttpTransportPolicy(
      new Request("https://labmanagergestionale.com/unknown?probe=1", {
        headers: { "cf-visitor": JSON.stringify({ scheme: "http" }) },
      }),
      forward,
    );

    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe(
      "https://labmanagergestionale.com/unknown?probe=1",
    );
    expect(forward).not.toHaveBeenCalled();
  });
});
