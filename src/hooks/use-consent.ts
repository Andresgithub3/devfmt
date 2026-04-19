"use client";

import { useState, useEffect, useCallback } from "react";

const CONSENT_KEY = "devfmt-cookie-consent";

export type ConsentState = "pending" | "accepted" | "declined";

export function useConsent() {
  const [consent, setConsent] = useState<ConsentState>("pending");

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored);
    }
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setConsent("declined");
  }, []);

  return { consent, accept, decline };
}
