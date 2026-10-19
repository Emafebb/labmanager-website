"use client";

import { useEffect } from "react";

export default function PageMotion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    const stop = () => {
      if (media.matches) {
        observer.disconnect();
      }
    };
    media.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", stop);
    };
  }, []);
  return null;
}
