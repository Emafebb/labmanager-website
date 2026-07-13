const SAFE_HTTP_METHODS = new Set(["GET", "HEAD"]);
const PRODUCTION_HOSTNAME = "labmanagergestionale.com";

type OriginForwarder = (request: Request) => Response | Promise<Response>;

function incomingScheme(request: Request): "http" | "https" {
  const cloudflareVisitor = request.headers.get("cf-visitor");

  if (cloudflareVisitor) {
    try {
      const { scheme } = JSON.parse(cloudflareVisitor) as { scheme?: unknown };
      if (scheme === "http" || scheme === "https") {
        return scheme;
      }
    } catch {
      // Fall back to the URL supplied by the runtime when the header is absent
      // or malformed (for example in local Wrangler preview).
    }
  }

  return new URL(request.url).protocol === "http:" ? "http" : "https";
}

export async function enforceHttpTransportPolicy(
  request: Request,
  forwardToOpenNext: OriginForwarder,
): Promise<Response> {
  if (new URL(request.url).hostname !== PRODUCTION_HOSTNAME) {
    return forwardToOpenNext(request);
  }

  if (incomingScheme(request) === "https") {
    return forwardToOpenNext(request);
  }

  if (!SAFE_HTTP_METHODS.has(request.method.toUpperCase())) {
    return new Response("Bad Request", {
      status: 400,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
        "x-labmanager-edge-policy": "block-insecure-http-method",
      },
    });
  }

  const destination = new URL(request.url);
  destination.protocol = "https:";

  return new Response(null, {
    status: 308,
    headers: {
      location: destination.toString(),
      "cache-control": "public, max-age=3600",
      "x-labmanager-edge-policy": "redirect-http-to-https",
    },
  });
}
