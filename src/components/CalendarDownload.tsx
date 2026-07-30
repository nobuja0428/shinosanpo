"use client";

import type { Event } from "@/content";
import { createEventIcs } from "@/lib/calendar";

export function CalendarDownload({ event }: { event: Event }) {
  const download = () => {
    const blob = new Blob([createEventIcs(event)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${event.slug}.ics`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return <button type="button" onClick={download}>カレンダーへ追加（ICS）</button>;
}
