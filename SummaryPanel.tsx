import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: [`${siteConfig.productionBasePath}/search/`, `${siteConfig.productionBasePath}/favorites/`] }],
    sitemap: absoluteUrl("/sitemap.xml")
  };
}
