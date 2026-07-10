import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CloudflareWebAnalytics from "./CloudflareWebAnalytics";

describe("CloudflareWebAnalytics", () => {
  it("omits the beacon when no token is configured", () => {
    const { container } = render(<CloudflareWebAnalytics token="" />);

    expect(container.querySelector("script")).toBeNull();
  });

  it("renders the official deferred beacon with the site token", () => {
    const { container } = render(
      <CloudflareWebAnalytics token="site-token" />,
    );
    const script = container.querySelector("script");

    expect(script).toHaveAttribute(
      "src",
      "https://static.cloudflareinsights.com/beacon.min.js",
    );
    expect(script).toHaveAttribute("defer");
    expect(script).toHaveAttribute(
      "data-cf-beacon",
      JSON.stringify({ token: "site-token" }),
    );
  });
});
