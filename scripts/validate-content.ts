import fs from "node:fs";
import path from "node:path";
import { areas, events, courses, spots, stories } from "../src/content";

const root = path.resolve(import.meta.dirname, "..");
const errors: string[] = [];

const validUrl = (value: string) => {
  try { return new URL(value).protocol === "https:"; } catch { return false; }
};

const validDate = (value: string | null) => value === null || /^\d{4}-\d{2}-\d{2}$/.test(value);
const ids = new Set<string>();
const slugs = new Set<string>();

for (const [type, items] of Object.entries({ areas, courses, spots, stories, events })) {
  for (const item of items) {
    const typed = item as { id: string; slug: string; publicationStatus: string; trust: { updatedAt: string; verifiedAt: string | null; sources: { url: string }[] }; image?: { src: string; alt: string; kind: string; label: string } };
    const idKey = `${type}:${typed.id}`;
    const slugKey = `${type}:${typed.slug}`;
    if (ids.has(idKey)) errors.push(`ID重複: ${idKey}`);
    if (slugs.has(slugKey)) errors.push(`slug重複: ${slugKey}`);
    ids.add(idKey);
    slugs.add(slugKey);
    if (!typed.id || !typed.slug || !typed.publicationStatus) errors.push(`必須メタ欠損: ${idKey}`);
    if (!validDate(typed.trust.updatedAt) || !validDate(typed.trust.verifiedAt)) errors.push(`不正日付: ${idKey}`);
    typed.trust.sources.forEach((source) => { if (!validUrl(source.url)) errors.push(`不正URL: ${idKey} ${source.url}`); });
    if (typed.image) {
      const file = path.join(root, "public", typed.image.src.replace(/^\//, ""));
      if (!fs.existsSync(file)) errors.push(`画像不存在: ${idKey} ${typed.image.src}`);
      if (!typed.image.alt.trim()) errors.push(`alt欠損: ${idKey}`);
      if (typed.image.kind === "ai-image" && typed.image.label !== "イメージ") errors.push(`AI画像ラベル欠損: ${idKey}`);
    }
  }
}

const areaIds = new Set(areas.map((item) => item.id));
for (const item of [...courses, ...spots, ...stories]) {
  if (!areaIds.has(item.areaId)) errors.push(`参照先エリア不存在: ${item.id}`);
}
for (const route of courses) {
  if (!route.durationMin || !route.distanceKm || route.budgetMaxYen <= 0 || !route.start || !route.goal || !route.escapeStations.length) {
    errors.push(`公開中コースの実用メタ欠損: ${route.id}`);
  }
  if (!route.transit.length || !route.foodBreaks.length || !route.toilets.length) errors.push(`実用情報欠損: ${route.id}`);
}
for (const event of events) {
  if (!event.officialUrl || !event.trust.verifiedAt) errors.push(`公開イベントの公式URL・確認日欠損: ${event.id}`);
  if (new Date(event.startAt) > new Date(event.endAt)) errors.push(`イベント日時矛盾: ${event.id}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Content validation passed: ${areas.length} areas, ${courses.length} courses, ${spots.length} spots, ${stories.length} stories, ${events.length} current events.`);
