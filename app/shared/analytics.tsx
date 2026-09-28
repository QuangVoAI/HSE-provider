"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (command: "event", eventName: string, parameters?: Record<string, unknown>) => void;
  }
}

export function trackAnalyticsEvent(eventName: string, parameters: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_GA_ID?.trim()) return;

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, parameters);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...parameters });
}

export default function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID?.trim();

  useEffect(() => {
    if (!measurementId) return;

    const trackInteraction = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (link) {
        const href = link.href;
        let method: string | undefined;

        if (href.includes("google.com/maps")) method = "map";
        else if (href.startsWith("tel:")) method = "phone";
        else if (href.startsWith("mailto:") || href.includes("mail.google.com/mail")) method = "email";

        if (method) {
          trackAnalyticsEvent("contact_click", { method, page_path: window.location.pathname });
        } else if (href.startsWith("https://portal.1hse.vn")) {
          trackAnalyticsEvent("portal_click", { page_path: window.location.pathname });
        } else if (/^https:\/\/(?:www\.)?atld\.vn(?:\/|$)/i.test(href)) {
          trackAnalyticsEvent("knowledge_hub_click", {
            destination: href,
            page_path: window.location.pathname,
          });
        }
      }

      const button = target.closest<HTMLButtonElement>("button[aria-label]");
      const label = button?.getAttribute("aria-label") || "";
      if (/^(Phát video|Play video)/i.test(label)) {
        trackAnalyticsEvent("video_start", { video_title: label.replace(/^[^:]+:\s*/, ""), page_path: window.location.pathname });
      }
    };

    document.addEventListener("click", trackInteraction);
    return () => document.removeEventListener("click", trackInteraction);
  }, [measurementId]);

  if (!measurementId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
