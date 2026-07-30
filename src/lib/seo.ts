import type { Metadata } from "next";
import type { ImageDisclosure } from "@/content";
import { absoluteUrl, siteConfig } from "@/config/site";

export const pageMetadata = (
  title: string,
  description: string,
  path: string,
  image?: ImageDisclosure,
  noindex = false
): Metadata => {
  const imageUrl = absoluteUrl(image?.src ?? "/images/hero/hero-tokyo-walk.webp");
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true, googleBot: { "max-image-preview": "large" } },
    openGraph: {
      type: "article",
      locale: "ja_JP",
      siteName: siteConfig.siteName,
      title,
      description,
      url: absoluteUrl(path),
      images: [{ url: imageUrl, width: image?.width ?? 1600, height: image?.height ?? 900, alt: image?.alt ?? "東京の街歩きを表現したイメージ" }]
    },
    twitter: { card: "summary_large_image", title, description, images: [imageUrl] }
  };
};

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ホーム", item: absoluteUrl("/") },
    ...items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 2,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  ]
});
