"use client";

import type { MouseEvent, ReactNode } from "react";
import { LEGALBLINK_COOKIE_SETTINGS_TRIGGER_ID } from "@/lib/legalblink";

type CookieSettingsLinkProps = {
  children: ReactNode;
  className: string;
};

export default function CookieSettingsLink({
  children,
  className,
}: CookieSettingsLinkProps) {
  function openCookieSettings(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById(LEGALBLINK_COOKIE_SETTINGS_TRIGGER_ID)?.click();
  }

  return (
    <a
      href="#"
      className={`lb-cs-settings-link ${className}`}
      onClickCapture={openCookieSettings}
    >
      {children}
    </a>
  );
}
