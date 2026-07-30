import { describe, expect, it } from "vitest";
import { resolveEventStatus } from "@/lib/events";

const event = {
  startAt: "2026-08-01T10:00:00+09:00",
  endAt: "2026-08-01T12:00:00+09:00",
  manualOverride: null
};

describe("resolveEventStatus", () => {
  it("開始前はscheduled", () => expect(resolveEventStatus(event, new Date("2026-08-01T00:59:59Z"))).toBe("scheduled"));
  it("開始境界はongoing", () => expect(resolveEventStatus(event, new Date("2026-08-01T01:00:00Z"))).toBe("ongoing"));
  it("終了境界はongoing", () => expect(resolveEventStatus(event, new Date("2026-08-01T03:00:00Z"))).toBe("ongoing"));
  it("終了後はended", () => expect(resolveEventStatus(event, new Date("2026-08-01T03:00:01Z"))).toBe("ended"));
  it("手動上書きを優先", () => expect(resolveEventStatus({ ...event, manualOverride: "cancelled" }, new Date("2026-08-01T02:00:00Z"))).toBe("cancelled"));
});
