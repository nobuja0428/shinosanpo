import { areas, courses, spots, stories } from "@/content";
import type { AreaId, ContentType, TrustInfo } from "@/content";
import { contentPath } from "@/lib/routes";

export const areaById = (id: AreaId) => areas.find((item) => item.id === id);
export const courseBySlug = (slug: string) => courses.find((item) => item.slug === slug);
export const spotBySlug = (slug: string) => spots.find((item) => item.slug === slug);
export const storyBySlug = (slug: string) => stories.find((item) => item.slug === slug);

export const contentHref = (type: ContentType, slug: string) => contentPath(type, slug);

export const trustLabel = (trust: TrustInfo) => {
  if (trust.isFieldChecked) return "現地確認済み";
  if (trust.verifiedAt) return "公開情報を確認・現地未確認";
  return "公開情報を参照・確認日未記録";
};

export const contentCountByArea = (areaId: AreaId) =>
  courses.filter((item) => item.areaId === areaId).length +
  spots.filter((item) => item.areaId === areaId).length +
  stories.filter((item) => item.areaId === areaId).length;

export const relatedForArea = (areaId: AreaId, excludeId: string) => [
  ...courses
    .filter((item) => item.areaId === areaId && item.id !== excludeId)
    .map((item) => ({ type: "course" as const, id: item.id, title: item.title, href: contentPath("course", item.slug) })),
  ...spots
    .filter((item) => item.areaId === areaId && item.id !== excludeId)
    .map((item) => ({ type: "spot" as const, id: item.id, title: item.name, href: contentPath("spot", item.slug) })),
  ...stories
    .filter((item) => item.areaId === areaId && item.id !== excludeId)
    .map((item) => ({ type: "story" as const, id: item.id, title: item.title, href: contentPath("story", item.slug) }))
].slice(0, 3);
