import type { Metadata } from "next";
import { UrlDecodeClient } from "./client";

export const metadata: Metadata = {
  title: "URL Decoder",
  description: "Decode percent-encoded URL strings — fast, private, no signup.",
  keywords: ["url decode", "url decoder", "percent decode", "decodeURIComponent"],
};

export default function UrlDecodePage() {
  return <UrlDecodeClient />;
}
