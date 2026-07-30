import { describe, expect, it, vi } from "vitest";
import { createEventIcs } from "@/lib/calendar";
import type { Event } from "@/content";

describe("createEventIcs", () => {
  it("確認済みイベントをUTCのICSへ変換する", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-30T00:00:00Z"));
    const event = {
      id: "verified-event",
      title: "確認済みイベント",
      area: "東京都",
      startAt: "2026-08-01T01:00:00Z",
      endAt: "2026-08-01T02:00:00Z",
      officialUrl: "https://example.org/event",
      manualOverride: "scheduled",
      publicationStatus: "published",
      slug: "verified-event",
      trust: { updatedAt: "2026-07-30", verifiedAt: "2026-07-30", isFieldChecked: false, publicInfoBased: true, aiAssisted: false, sources: [] }
    } satisfies Event;
    const output = createEventIcs(event);
    expect(output).toContain("DTSTART:20260801T010000Z");
    expect(output).toContain("SUMMARY:確認済みイベント");
    expect(output).toContain("URL:https://example.org/event");
    vi.useRealTimers();
  });
});
