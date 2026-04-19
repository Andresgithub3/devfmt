"use client";

import { useEffect, useRef } from "react";
import { useConsent } from "@/hooks/use-consent";

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

interface AdSlotProps {
  slot: string;
  format?: "auto" | "horizontal" | "vertical" | "rectangle";
  className?: string;
}

export function AdSlot({ slot, format = "auto", className }: AdSlotProps) {
  const { consent } = useConsent();
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (consent !== "accepted" || !ADSENSE_ID || pushed.current) return;
    try {
      ((window as unknown as Record<string, unknown[]>).adsbygoogle =
        (window as unknown as Record<string, unknown[]>).adsbygoogle || []).push(
        {}
      );
      pushed.current = true;
    } catch {
      // AdSense not loaded or blocked
    }
  }, [consent]);

  if (consent !== "accepted" || !ADSENSE_ID) return null;

  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
