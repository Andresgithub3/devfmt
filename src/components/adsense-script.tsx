"use client";

import { useEffect, useRef } from "react";
import { useConsent } from "@/hooks/use-consent";

const ADSENSE_ID = "ca-pub-9681069917942148";

export function AdSenseScript() {
  const { consent } = useConsent();
  const loaded = useRef(false);

  useEffect(() => {
    if (consent !== "accepted" || loaded.current || !ADSENSE_ID) return;

    const script = document.createElement("script");
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
    loaded.current = true;
  }, [consent]);

  return null;
}
