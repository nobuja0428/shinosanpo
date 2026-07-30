import { areas, courses, spots, stories } from "@/content";
import type { AreaId, ContentType } from "@/content";
import { contentPath } from "@/lib/routes";

export interface SearchItem {
  id: string;
  type: ContentType;
  title: string;
  summary: string;
  areaId: AreaId;
  tags: string[];
  href: string;
}

export const searchIndex: SearchItem[] = [
  ...areas.map((item) => ({
    id: item.id,
    type: "area" as const,
    title: item.name,
    summary: item.lead,
    areaId: item.id,
    tags: item.tags,
    href: contentPath("area", item.slug)
  })),
  ...courses.map((item) => ({
    id: item.id,
    type: "course" as const,
    title: item.title,
    summary: item.summary,
    areaId: item.areaId,
    tags: item.tags,
    href: contentPath("course", item.slug)
  })),
  ...spots.map((item) => ({
    id: item.id,
    type: "spot" as const,
    title: item.name,
    summary: item.summary,
    areaId: item.areaId,
    tags: item.tags,
    href: contentPath("spot", item.slug)
  })),
  ...stories.map((item) => ({
    id: item.id,
    type: "story" as const,
    title: item.title,
    summary: item.summary,
    areaId: item.areaId,
    tags: [item.category],
    href: contentPath("story", item.slug)
  }))
];

const normalize = (value: string) => value.normalize("NFKC").toLocaleLowerCase("ja");

export const filterSearch = (
  items: SearchItem[],
  query: string,
  area: AreaId | "",
  tags: string[]
) => {
  const needle = normalize(query.trim());
  return items.filter((item) => {
    if (area && item.areaId !== area) return false;
    if (tags.length && !tags.every((tag) => item.tags.includes(tag))) return false;
    if (!needle) return true;
    return normalize([item.title, item.summary, item.areaId, ...item.tags].join(" ")).includes(needle);
  });
};
