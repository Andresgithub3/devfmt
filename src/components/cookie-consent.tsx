"use client";

import { useConsent } from "@/hooks/use-consent";

function updateGtagConsent(granted: boolean) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: granted ? "granted" : "denied",
      ad_user_data: granted ? "granted" : "denied",
      ad_personalization: granted ? "granted" : "denied",
    });
  }
}

export function CookieConsent() {
  const { consent, accept, decline } = useConsent();

  if (consent !== "pending") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm px-4 py-3">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground text-center sm:text-left">
          We use cookies for anonymous analytics and ads. Your tool data never
          leaves your browser.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => { decline(); updateGtagConsent(false); }}
            className="px-3 py-1.5 rounded text-xs font-mono text-muted-foreground hover:text-foreground bg-muted transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => { accept(); updateGtagConsent(true); }}
            className="px-3 py-1.5 rounded text-xs font-mono text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
