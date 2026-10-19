"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { WHATSAPP_URL } from "@/data/support-links";
import { WORK_AREAS } from "@/data/work-areas";

const SUPPORTED_ROUTES = new Set([
  "/",
  "/pricing",
  "/newsletter",
  ...WORK_AREAS.map((area) => area.href),
  "/billing/success",
  "/billing/cancel",
  "/account/billing",
]);

export default function WhatsAppButton() {
  const pathname = usePathname();
  const enabled = SUPPORTED_ROUTES.has(pathname);
  const [footerContactVisible, setFooterContactVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const contact = document.querySelector(
      `.site-footer a[href="${WHATSAPP_URL}"]`,
    );
    if (!contact || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      setFooterContactVisible(entry.isIntersecting);
    });
    observer.observe(contact);
    return () => observer.disconnect();
  }, [pathname, enabled]);

  if (!enabled) return null;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Scrivici su WhatsApp"
      hidden={footerContactVisible}
    >
      <MessageCircle size={22} aria-hidden="true" />
      <span><span className="whatsapp-float__prefix">Scrivici su </span>WhatsApp</span>
    </a>
  );
}

export { WHATSAPP_URL } from "@/data/support-links";
