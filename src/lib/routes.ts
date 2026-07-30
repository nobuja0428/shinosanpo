export type ContentPathType = "area" | "course" | "spot" | "story";

const segments: Record<ContentPathType, string> = {
  area: "areas",
  course: "courses",
  spot: "spots",
  story: "stories"
};

export const contentPath = (type: ContentPathType, slug: string) =>
  `/${segments[type]}/${slug}/`;

export const normalizeAppPath = (path: string) => {
  const pathname = path.startsWith("/") ? path : `/${path}`;
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
};
