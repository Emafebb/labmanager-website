type CloudflareWebAnalyticsProps = {
  token?: string;
};

export default function CloudflareWebAnalytics({
  token = process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN,
}: CloudflareWebAnalyticsProps) {
  if (!token) {
    return null;
  }

  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
