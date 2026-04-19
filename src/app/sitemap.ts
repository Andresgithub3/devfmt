import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";

const SITE_URL = "https://devfmt.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = TOOLS.map((tool) => ({
    url: `${SITE_URL}${tool.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...toolPages,
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
