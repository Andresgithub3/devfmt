import type { Metadata } from "next";
import { HtmlEncodeClient } from "./client";

export const metadata: Metadata = {
  title: "HTML Entity Encoder",
  description: "Encode special characters to HTML entities — fast, private, no signup.",
  keywords: ["html encode", "html entity encode", "html escape", "html special characters"],
};

export default function HtmlEncodePage() {
  return <HtmlEncodeClient />;
}
