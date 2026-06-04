"use client";

import { useState } from "react";

// Web3Forms access key. This value is safe to expose in client code — it only
// routes submissions to the inbox configured at web3forms.com and never reveals
// the destination email address. Get one free at https://web3forms.com.
const WEB3FORMS_ACCESS_KEY = "ee2b02ee-901f-4a79-aa9d-28582256214e";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: real users never fill this hidden field.
    if (data.botcheck) {
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New DevFmt contact form submission",
          from_name: "DevFmt Contact Form",
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Could not send your message. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-success/40 bg-success/10 px-4 py-3 text-sm text-foreground">
        Thanks — your message has been sent. We&rsquo;ll get back to you soon.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field — hidden from real users */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-xs font-medium text-foreground">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-xs font-medium text-foreground">
          Your email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="so we can reply"
          className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 placeholder:text-muted-foreground/40"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-xs font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-md outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 resize-y"
        />
      </div>

      {status === "error" && (
        <p className="text-xs text-destructive">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
