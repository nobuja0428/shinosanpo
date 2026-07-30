import type { ImageDisclosure, Source, TrustInfo } from "./types";

export const image = (
  src: string,
  alt: string,
  width = 1200,
  height = 900
): ImageDisclosure => ({
  src,
  alt,
  width,
  height,
  kind: "ai-image",
  label: "イメージ"
});

export const official = (label: string, url: string): Source => ({
  label,
  url,
  kind: "official"
});

export const publicData = (label: string, url: string): Source => ({
  label,
  url,
  kind: "public-data"
});

export const trust = (
  updatedAt: string,
  verifiedAt: string | null,
  sources: Source[]
): TrustInfo => ({
  updatedAt,
  verifiedAt,
  isFieldChecked: false,
  publicInfoBased: true,
  aiAssisted: true,
  sources
});
