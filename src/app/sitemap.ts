import type { MetadataRoute } from "next";
import { areas, courses, spots, stories } from "@/content";
import { absoluteUrl } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/", "/areas/", "/courses/", "/spots/", "/stories/", "/events/", "/map/",
    "/about/", "/editorial-policy/", "/privacy/", "/advertise/", "/contact/"
  ];
  const paths = [
    ...staticPaths,
    ...areas.map((item) => `/areas/${item.slug}/`),
    ...courses.map((item) => `/courses/${item.slug}/`),
    ...spots.map((item) => `/spots/${item.slug}/`),
    ...stories.map((item) => `/stories/${item.slug}/`)
  ];
  return paths.map((path) => ({ url: absoluteUrl(path), changeFrequency: "weekly", priority: path === "/" ? 1 : 0.7 }));
}
