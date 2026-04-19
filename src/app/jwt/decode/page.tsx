import type { Metadata } from "next";
import { JwtDecodeClient } from "./client";

export const metadata: Metadata = {
  title: "JWT Decoder",
  description: "Decode and inspect JWT tokens — header, payload, and expiration — fast, private, no signup.",
  keywords: ["jwt decoder", "jwt decode online", "json web token decoder", "jwt parser"],
};

export default function JwtDecodePage() {
  return <JwtDecodeClient />;
}
