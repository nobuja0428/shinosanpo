import raw from "../../site.config.json";

const trimSlash = (value: string) => value.replace(/\/+$/, "");
const normalizeBasePath = (value: string) => {
  if (!value || value === "/") return "";
  return `/${value.replace(/^\/+|\/+$/g, "")}`;
};

export const siteConfig = {
  ...raw,
  productionUrl: `${trimSlash(raw.productionUrl)}/`,
  productionBasePath: normalizeBasePath(raw.productionBasePath),
  description:
    "高円寺・吉祥寺・浅草を、時間・予算・気分から選べる東京の散歩ガイド。確認日と参照元を明示します。"
} as const;

export const runtimeBasePath = normalizeBasePath(
  process.env.NEXT_PUBLIC_BASE_PATH ??
    (process.env.NODE_ENV === "production" ? siteConfig.productionBasePath : "")
);

export const withBasePath = (path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!runtimeBasePath) return normalized;
  return normalized === "/" ? `${runtimeBasePath}/` : `${runtimeBasePath}${normalized}`;
};

export const absoluteUrl = (path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized.replace(/^\//, ""), siteConfig.productionUrl).toString();
};

export const googleMapsUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
