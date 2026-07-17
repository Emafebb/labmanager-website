"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

const TABNAV_WIDGET_CONFIG = {
  language: "it",
  color: "#4403af",
  buttonColor: "#4403af",
  buttonSize: "large",
  widgetSize: "small",
  widgetLocation: "left",
  buttonLocation: "bottom",
} as const;

const STANDALONE_ROUTES = ["/instagram"];

export const EXTERNAL_WIDGET_THEME_SCRIPT = `
(function () {
  var legalBlinkCss = [
    ':host{--primary:#4403af!important;--primary-foreground:#fff!important;--ring:#d1d5db!important;--border:#e5e7eb!important;--input:#e5e7eb!important;}',
    'button,[role="button"]{box-shadow:none!important;min-width:44px!important;min-height:44px!important;}',
    'button:focus-visible,[role="button"]:focus-visible{outline:2px solid #d1d5db!important;outline-offset:2px!important;box-shadow:none!important;}'
  ].join('');

  var tabNavCss = [
    '.tr-button{min-width:44px!important;min-height:44px!important;}',
    '.tr-button:focus-visible{outline:2px solid #d1d5db!important;outline-offset:2px!important;}'
  ].join('');

  function upsertStyle(root, id, css) {
    if (!root) return;
    var style = root.getElementById(id);
    if (!style) {
      style = document.createElement('style');
      style.id = id;
      root.appendChild(style);
    }
    style.textContent = css;
  }

  function patchLegalBlink() {
    var banner = document.querySelector('lb-cookie-banner');
    if (!banner) return;
    banner.style.setProperty('--primary', '#4403af', 'important');
    banner.style.setProperty('--primary-foreground', '#ffffff', 'important');
    banner.style.setProperty('--ring', '#d1d5db', 'important');
    banner.style.setProperty('--border', '#e5e7eb', 'important');
    banner.style.setProperty('--input', '#e5e7eb', 'important');
    upsertStyle(banner.shadowRoot, 'labmanager-legalblink-theme', legalBlinkCss);
  }

  function patchTabNav() {
    document.querySelectorAll('container-element').forEach(function (widget) {
      upsertStyle(widget.shadowRoot, 'labmanager-tabnav-theme', tabNavCss);
    });
  }

  function patchWidgets() {
    patchLegalBlink();
    patchTabNav();
  }

  patchWidgets();
  new MutationObserver(patchWidgets).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  window.addEventListener('load', patchWidgets);
  [250, 750, 1500, 3000].forEach(function (delay) {
    window.setTimeout(patchWidgets, delay);
  });
})();
`;

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
        data-tcf-enabled="true"
      />
      <Script id="external-widget-theme" strategy="afterInteractive">
        {EXTERNAL_WIDGET_THEME_SCRIPT}
      </Script>
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
