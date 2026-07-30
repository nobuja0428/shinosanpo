import type { Event } from "@/content";

const escapeIcs = (value: string) => value.replaceAll("\\", "\\\\").replaceAll("\n", "\\n").replaceAll(",", "\\,").replaceAll(";", "\\;");
const icsDate = (value: string) => new Date(value).toISOString().replaceAll("-", "").replaceAll(":", "").replace(".000", "");

export const createEventIcs = (event: Event) => [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//Tokyo Sanpo Club//Event//JA",
  "CALSCALE:GREGORIAN",
  "BEGIN:VEVENT",
  `UID:${escapeIcs(event.id)}@shinosanpo`,
  `DTSTAMP:${icsDate(new Date().toISOString())}`,
  `DTSTART:${icsDate(event.startAt)}`,
  `DTEND:${icsDate(event.endAt)}`,
  `SUMMARY:${escapeIcs(event.title)}`,
  `LOCATION:${escapeIcs(event.area)}`,
  `URL:${escapeIcs(event.officialUrl)}`,
  "END:VEVENT",
  "END:VCALENDAR",
  ""
].join("\r\n");
