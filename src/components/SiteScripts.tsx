"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

const TABNAV_WIDGET_CONFIG = {
  language: "it",
  color: "#405ec3",
  buttonColor: "#3254c3",
  buttonSize: "large",
  widgetSize: "small",
  widgetLocation: "left",
  buttonLocation: "bottom",
} as const;

const STANDALONE_ROUTES = ["/instagram"];

export default function SiteScripts() {
  const pathname = usePathname();
  if (STANDALONE_ROUTES.includes(pathname)) return null;

  return (
    <>
      <Script
        id="legalblink-cmp"
        type="text/javascript"
        src="https://app.legalblink.it/api/scripts/cmp/loader.js"
        strategy="afterInteractive"
        data-license-id="69e89f282420950024cb1a5e"
        data-blocking-mode="auto"
        data-consent-mode="true"
      />
      <Script
        id="tabnav-accessibility-widget"
        src="https://widget.tabnav.com/limited-widget.min.js.gz"
        strategy="lazyOnload"
        tnv-data-config={JSON.stringify(TABNAV_WIDGET_CONFIG)}
      />
      <noscript>
        JavaScript is required for our{" "}
        <a href="https://tabnav.com/accessibility-widget">
          accessibility widget
        </a>{" "}
        to work properly.
      </noscript>
    </>
  );
}
