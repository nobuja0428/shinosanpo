import type { Event, EventStatus } from "@/content";

const tokyoMs = (iso: string) => new Date(iso).getTime();

export const resolveEventStatus = (
  event: Pick<Event, "startAt" | "endAt" | "manualOverride">,
  now = new Date()
): EventStatus => {
  if (event.manualOverride) return event.manualOverride;
  const start = tokyoMs(event.startAt);
  const end = tokyoMs(event.endAt);
  const current = now.getTime();
  if (current < start) return "scheduled";
  if (current <= end) return "ongoing";
  return "ended";
};
